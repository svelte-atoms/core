#!/usr/bin/env node
/**
 * Simpler script to manually sync props using regex parsing
 * Usage: node scripts/sync-props-simple.mjs [component-name]
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const COMPONENTS_DIR = join(ROOT, 'src/lib/components');
const DOCS_PROPS_DIR = join(ROOT, 'src/routes/docs/components');

/**
 * Known base interface props that components commonly extend.
 * These are extracted from the core types and cached here for reuse.
 */
const BASE_INTERFACE_PROPS = {
	ElementProps: [
		{
			name: 'class',
			type: 'ClassValue | ClassValue[]',
			default: 'undefined',
			description: 'CSS class(es) to apply to the element'
		},
		{ name: 'as', type: 'string', default: 'undefined', description: 'HTML tag to render as' },
		{
			name: 'global',
			type: 'boolean',
			default: 'false',
			description: 'Whether to use global styles'
		},
		{
			name: 'initial',
			type: 'NodeFunction',
			default: 'undefined',
			description: 'Function called on initial render'
		},
		{
			name: 'enter',
			type: 'TransitionFunction',
			default: 'undefined',
			description: 'Transition function for entering'
		},
		{
			name: 'exit',
			type: 'TransitionFunction',
			default: 'undefined',
			description: 'Transition function for exiting'
		},
		{
			name: 'animate',
			type: 'NodeFunction',
			default: 'undefined',
			description: 'Animation function'
		},
		{
			name: 'onmount',
			type: 'NodeFunction',
			default: 'undefined',
			description: 'Function called when element is mounted'
		},
		{
			name: 'ondestroy',
			type: 'NodeFunction',
			default: 'undefined',
			description: 'Function called when element is destroyed'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: 'undefined',
			description: 'Children content snippet'
		}
	],
	HtmlElementProps: [], // Extends ElementProps, no additional props
	SvgElementProps: [], // Extends ElementProps, no additional props
	HtmlAtomProps: [
		{
			name: 'bond',
			type: 'Bond',
			default: 'undefined',
			description: 'Bond object for component communication'
		},
		{
			name: 'base',
			type: 'Component | Snippet',
			default: 'undefined',
			description: 'Base component or snippet to render'
		},
		{
			name: 'preset',
			type: 'PresetModuleName | string',
			default: 'undefined',
			description: 'Preset module name for styling'
		},
		{
			name: 'variants',
			type: 'VariantDefinition | Function',
			default: 'undefined',
			description: 'Variant definition or function to resolve variants'
		}
	],
	SvgAtomProps: [
		{
			name: 'bond',
			type: 'Bond',
			default: 'undefined',
			description: 'Bond object for component communication'
		},
		{
			name: 'base',
			type: 'Component | Snippet',
			default: 'undefined',
			description: 'Base component or snippet to render'
		},
		{
			name: 'preset',
			type: 'PresetModuleName | string',
			default: 'undefined',
			description: 'Preset module name for styling'
		},
		{
			name: 'variants',
			type: 'VariantDefinition | Function',
			default: 'undefined',
			description: 'Variant definition or function to resolve variants'
		}
	]
};

/**
 * Defines inheritance chains for base interfaces
 */
const BASE_INTERFACE_EXTENDS = {
	HtmlElementProps: ['ElementProps'],
	SvgElementProps: ['ElementProps'],
	HtmlAtomProps: ['HtmlElementProps', 'ElementProps'],
	SvgAtomProps: ['SvgElementProps', 'ElementProps']
};

/**
 * Get all props from a base interface including inherited ones
 */
function getBaseInterfaceProps(interfaceName) {
	const props = [];
	const seen = new Set();

	// Add direct props
	const directProps = BASE_INTERFACE_PROPS[interfaceName] || [];
	for (const prop of directProps) {
		if (!seen.has(prop.name)) {
			seen.add(prop.name);
			props.push({ ...prop, inheritedFrom: interfaceName });
		}
	}

	// Add inherited props
	const extends_ = BASE_INTERFACE_EXTENDS[interfaceName] || [];
	for (const parentInterface of extends_) {
		const parentProps = BASE_INTERFACE_PROPS[parentInterface] || [];
		for (const prop of parentProps) {
			if (!seen.has(prop.name)) {
				seen.add(prop.name);
				props.push({ ...prop, inheritedFrom: parentInterface });
			}
		}
	}

	return props;
}

/**
 * Extract extended interface names from an interface declaration
 */
function extractExtendsFromInterface(content, interfaceName) {
	// Match the interface declaration and extract what it extends
	const extendsRegex = new RegExp(
		`export interface ${interfaceName}(?:<[^>]+>)?\\s+extends\\s+([^{]+)\\{`,
		'm'
	);

	const match = content.match(extendsRegex);
	if (!match) return [];

	const extendsClause = match[1];

	// Parse the extends clause - it may contain multiple interfaces separated by commas
	// Also need to handle generics like HtmlAtomProps<E, B>
	const interfaces = [];
	let current = '';
	let depth = 0;

	for (const char of extendsClause) {
		if (char === '<') {
			depth++;
			current += char;
		} else if (char === '>') {
			depth--;
			current += char;
		} else if (char === ',' && depth === 0) {
			const trimmed = current.trim();
			if (trimmed) {
				// Extract just the interface name without generics
				const nameMatch = trimmed.match(/^(\w+)/);
				if (nameMatch) interfaces.push(nameMatch[1]);
			}
			current = '';
		} else {
			current += char;
		}
	}

	// Don't forget the last one
	const trimmed = current.trim();
	if (trimmed) {
		const nameMatch = trimmed.match(/^(\w+)/);
		if (nameMatch) interfaces.push(nameMatch[1]);
	}

	return interfaces;
}

function extractPropsFromInterface(content, interfaceName, includeBaseProps = true) {
	// Find the interface declaration - handle generics and multiline extends
	// Pattern 1: Try to match extends with body content
	const interfaceRegex = new RegExp(
		`export interface ${interfaceName}(?:<[^>]+>)?[^{]*extends[^{]*\\{([\\s\\S]*?)\\}`,
		'm'
	);

	let match = content.match(interfaceRegex);
	if (!match) {
		// Pattern 2: Try without extends
		const simpleRegex = new RegExp(
			`export interface ${interfaceName}(?:<[^>]+>)?[^{]*\\{([\\s\\S]*?)\\}`,
			'm'
		);
		match = content.match(simpleRegex);
	}

	if (!match) return null;

	const interfaceBody = match[1];
	const props = [];

	// If interface body is NOT empty, extract properties
	if (interfaceBody && interfaceBody.trim() !== '') {
		// Extract properties - both with and without JSDoc
		const lines = interfaceBody.split('\n');
		let currentDoc = null;

		for (const line of lines) {
			const trimmed = line.trim();

			// Check for JSDoc start
			if (trimmed.startsWith('/**')) {
				currentDoc = [];
				continue;
			}

			// Collect JSDoc lines
			if (currentDoc !== null && trimmed.startsWith('*')) {
				const docLine = trimmed.replace(/^\*\s?/, '');
				if (docLine && !trimmed.endsWith('*/')) {
					currentDoc.push(docLine);
				}
				continue;
			}

			// Check for property declaration
			const propMatch = trimmed.match(/^(\w+)(\?)?:\s*([^;]+);/);
			if (propMatch) {
				const [, propName, optional, propType] = propMatch;

				// Extract description and default from JSDoc
				let description = '';
				let defaultValue = undefined;

				if (currentDoc) {
					for (const docLine of currentDoc) {
						if (docLine.startsWith('@default')) {
							defaultValue = docLine.replace('@default', '').trim();
						} else if (!docLine.startsWith('@')) {
							description += (description ? ' ' : '') + docLine;
						}
					}
				}

				// Infer default if not specified
				if (!defaultValue) {
					if (optional) {
						if (propType.includes('boolean')) defaultValue = 'false';
						else if (propType.includes('string')) defaultValue = "''";
						else if (propType.includes('number')) defaultValue = '0';
						else if (propType.includes('unknown')) defaultValue = 'undefined';
						else defaultValue = 'undefined';
					} else {
						defaultValue = '-';
					}
				}

				// Clean up type
				let type = propType.trim();
				type = type.replace(/\s+/g, ' ');
				type = type.replace(/import\(".*?"\)\./g, '');

				// Generate description if not provided
				if (!description) {
					description = propName.replace(/([A-Z])/g, ' $1').trim();
					description = description.charAt(0).toUpperCase() + description.slice(1);
				}

				props.push({
					name: propName,
					type,
					default: defaultValue,
					description
				});

				currentDoc = null;
			}
		}
	}

	// Add props from base interfaces if requested
	if (includeBaseProps) {
		const extendedInterfaces = extractExtendsFromInterface(content, interfaceName);
		const seen = new Set(props.map((p) => p.name));

		for (const extInterface of extendedInterfaces) {
			// Skip Extend interfaces (e.g., MenuItemExtendProps)
			if (extInterface.includes('Extend')) continue;

			const baseProps = getBaseInterfaceProps(extInterface);
			for (const baseProp of baseProps) {
				if (!seen.has(baseProp.name)) {
					seen.add(baseProp.name);
					props.push({
						name: baseProp.name,
						type: baseProp.type,
						default: baseProp.default,
						description: baseProp.description,
						inheritedFrom: baseProp.inheritedFrom || extInterface
					});
				}
			}
		}
	}

	return props;
}

function generateExportName(interfaceName) {
	// AccordionRootProps -> accordionRootProps
	// ButtonProps -> buttonProps
	return interfaceName.charAt(0).toLowerCase() + interfaceName.slice(1);
}

function parseExistingPropsFile(propsPath) {
	if (!existsSync(propsPath)) {
		return {};
	}

	try {
		const content = readFileSync(propsPath, 'utf-8');
		const existingProps = {};

		// Extract all prop arrays by finding export statements
		const arrayRegex = /export const (\w+): PropDefinition\[\] = \[([\s\S]*?)\n\];/g;
		let match;

		while ((match = arrayRegex.exec(content)) !== null) {
			const [, exportName, arrayContent] = match;
			const props = {};

			// Split by objects (looking for },) to get individual props
			const propObjects = arrayContent.split(/\},\s*\{/);

			for (let i = 0; i < propObjects.length; i++) {
				let objStr = propObjects[i].trim();

				// Add back the braces if needed
				if (!objStr.startsWith('{')) objStr = '{' + objStr;
				if (!objStr.endsWith('}')) objStr = objStr + '}';

				// Helper to extract value from either single or double quotes
				const extractValue = (fieldName) => {
					// Try single quotes first
					let match = objStr.match(new RegExp(`${fieldName}:\\s*'((?:[^'\\\\]|\\\\.)*)'`));
					if (match) {
						return match[1].replace(/\\'/g, "'");
					}
					// Try double quotes
					match = objStr.match(new RegExp(`${fieldName}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
					if (match) {
						return match[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
					}
					return null;
				};

				const name = extractValue('name');
				const type = extractValue('type');
				const defaultVal = extractValue('default');
				const description = extractValue('description');

				if (name && type && defaultVal !== null && description !== null) {
					props[name] = {
						type,
						default: defaultVal,
						description
					};
				}
			}

			if (Object.keys(props).length > 0) {
				existingProps[exportName] = props;
			}
		}

		return existingProps;
	} catch (err) {
		console.log(`  ⚠️  Could not parse existing props: ${err.message}`);
		return {};
	}
}

function isBetterDescription(newDesc, existingDesc) {
	if (!existingDesc) return true; // No existing, use new
	if (!newDesc) return false; // No new, keep existing

	// Auto-generated descriptions are usually just the capitalized prop name or single word
	const autoGenPattern = /^[A-Z][a-z]*$/;

	// If new looks auto-generated but existing doesn't, keep existing
	if (autoGenPattern.test(newDesc.trim()) && existingDesc.length > newDesc.length) {
		return false;
	}

	// If existing is much longer and more detailed, keep it
	if (existingDesc.length > newDesc.length * 1.5) {
		return false;
	}

	// If existing has more info (articles, punctuation, specific words), keep it
	const detailedWords = ['the ', 'for ', 'to ', 'attribute', 'behavior', 'whether', 'when', 'if '];
	const existingHasDetail = detailedWords.some((word) => existingDesc.toLowerCase().includes(word));
	const newHasDetail = detailedWords.some((word) => newDesc.toLowerCase().includes(word));

	if (existingHasDetail && !newHasDetail) {
		return false;
	}

	// Default: use new
	return true;
}

function mergeWithExisting(newProps, existingProps, exportName) {
	const existing = existingProps[exportName] || {};
	const merged = [];

	for (const prop of newProps) {
		const existingProp = existing[prop.name];

		if (existingProp) {
			// Merge: prefer existing description and default if they're better
			const defaultToUse = (() => {
				const meaninglessDefaults = ['undefined', '-', "''", '""', '0', 'false'];

				// If existing has a meaningful default (not generic), prefer it
				if (existingProp.default && !meaninglessDefaults.includes(existingProp.default)) {
					return existingProp.default;
				}
				// Otherwise use new default
				return prop.default;
			})();

			const descToUse = isBetterDescription(prop.description, existingProp.description)
				? prop.description
				: existingProp.description;

			merged.push({
				name: prop.name,
				type: prop.type, // Always use new type from source
				default: defaultToUse,
				description: descToUse
			});
		} else {
			// New prop, use as-is
			merged.push(prop);
		}
	}

	return merged;
}

function generatePropsFile(propsMap) {
	let content = `export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

`;

	for (const [exportName, props] of Object.entries(propsMap)) {
		content += `export const ${exportName}: PropDefinition[] = [\n`;

		for (const prop of props) {
			content += `\t{\n`;
			content += `\t\tname: '${prop.name}',\n`;
			content += `\t\ttype: '${prop.type.replace(/'/g, "\\'")}',\n`;
			content += `\t\tdefault: '${prop.default.replace(/'/g, "\\'")}',\n`;
			content += `\t\tdescription: '${prop.description.replace(/'/g, "\\'")}'`;
			content += `\n\t},\n`;
		}

		content += `];\n\n`;
	}

	return content;
}

/**
 * Recursively find all types.ts files in a component directory
 */
function findAllTypesFiles(componentDir) {
	const typesFiles = [];

	function searchDir(dir) {
		try {
			const entries = readdirSync(dir);

			for (const entry of entries) {
				const fullPath = join(dir, entry);

				try {
					const stat = statSync(fullPath);

					if (stat.isDirectory()) {
						// Skip node_modules and hidden directories
						if (!entry.startsWith('.') && entry !== 'node_modules') {
							searchDir(fullPath);
						}
					} else if (stat.isFile() && entry === 'types.ts') {
						typesFiles.push(fullPath);
					}
				} catch (err) {
					// Skip files/dirs we can't access
					continue;
				}
			}
		} catch (err) {
			// Skip directories we can't read
		}
	}

	searchDir(componentDir);
	return typesFiles;
}

function syncComponent(componentName) {
	console.log(`\n📋 Processing ${componentName}...`);

	const componentDir = join(COMPONENTS_DIR, componentName);
	const docsPropsPath = join(DOCS_PROPS_DIR, componentName, 'props.ts');

	if (!existsSync(componentDir)) {
		console.log(`  ⚠️  Component directory not found: ${componentDir}`);
		return false;
	}

	// Find all types.ts files in the component directory (including subdirectories for compounds)
	const typesFiles = findAllTypesFiles(componentDir);

	if (typesFiles.length === 0) {
		console.log(`  ⚠️  No types.ts files found in ${componentDir}`);
		return false;
	}

	console.log(`  ✓ Found ${typesFiles.length} types.ts file(s)`);

	try {
		// Parse existing props to preserve manual edits
		const existingProps = parseExistingPropsFile(docsPropsPath);

		const propsMap = {};

		// Process each types.ts file
		for (const typesPath of typesFiles) {
			const typesContent = readFileSync(typesPath, 'utf-8');

			// Find all exported Props interfaces
			const interfaceRegex = /export interface (\w+Props)\b/g;
			const interfaces = [];
			let match;

			while ((match = interfaceRegex.exec(typesContent)) !== null) {
				const interfaceName = match[1];
				// Skip Extend interfaces
				if (!interfaceName.includes('Extend')) {
					interfaces.push(interfaceName);
				}
			}

			if (interfaces.length > 0) {
				console.log(`    From ${typesPath}:`);
			}

			for (const interfaceName of interfaces) {
				const props = extractPropsFromInterface(typesContent, interfaceName);
				// Include even if props is empty or null - compound components might only extend HtmlAtomProps
				const exportName = generateExportName(interfaceName);

				if (props && props.length > 0) {
					// Merge with existing to preserve manual edits
					const mergedProps = mergeWithExisting(props, existingProps, exportName);
					propsMap[exportName] = mergedProps;
					console.log(`      - ${interfaceName} → ${exportName} (${mergedProps.length} props)`);
				} else if (props !== null) {
					// Interface exists but has no specific props (likely extends HtmlAtomProps only)
					// Check if it already exists in props map to preserve it
					const existingProp = existingProps[exportName];
					if (existingProp && Object.keys(existingProp).length > 0) {
						// Preserve existing props
						const existingArray = Object.entries(existingProp).map(([name, prop]) => ({
							name,
							...prop
						}));
						propsMap[exportName] = existingArray;
						console.log(
							`      - ${interfaceName} → ${exportName} (${existingArray.length} props, preserved)`
						);
					} else {
						// Create empty array but still include it
						propsMap[exportName] = [];
						console.log(
							`      - ${interfaceName} → ${exportName} (0 props, extends HtmlAtomProps)`
						);
					}
				}
			}
		}

		if (Object.keys(propsMap).length === 0) {
			console.log(`  ⚠️  No props extracted`);
			return false;
		}

		const propsFileContent = generatePropsFile(propsMap);
		writeFileSync(docsPropsPath, propsFileContent, 'utf-8');
		console.log(`  ✅ Updated ${docsPropsPath}`);

		return true;
	} catch (error) {
		console.error(`  ❌ Error: ${error.message}`);
		return false;
	}
}

// Main execution
const components = [
	'accordion',
	'alert',
	'avatar',
	'badge',
	'breadcrumb',
	'button',
	'card',
	'checkbox',
	'collapsible',
	'combobox',
	'contextmenu',
	'datagrid',
	'dialog',
	'divider',
	'drawer',
	'dropdown',
	'form',
	'input',
	'label',
	'link',
	'list',
	'menu',
	'popover',
	'radio',
	'scrollable',
	'sidebar',
	'stack',
	'tabs',
	'textarea',
	'toast',
	'tooltip',
	'tree'
];

console.log('🔄 Syncing component props from types.ts to props.ts...\n');

const args = process.argv.slice(2);
const targetComponents = args.length === 0 || args[0] === 'all' ? components : args;

let successCount = 0;
let failCount = 0;

for (const component of targetComponents) {
	if (syncComponent(component)) {
		successCount++;
	} else {
		failCount++;
	}
}

console.log(`\n✨ Completed: ${successCount} synced, ${failCount} failed`);
