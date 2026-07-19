import { access, readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const entries = Object.entries(pkg.exports ?? {});
const failures = [];
const componentPattern = './components/*';

const exactTargets = new Map([
	['.', './dist/index'],
	['./preset', './dist/preset/index'],
	['./utils', './dist/public/utils'],
	['./shared', './dist/public/shared'],
	['./experimental', './dist/public/experimental']
]);
const styleTargets = new Map([
	['./styles/root.css', './dist/components/root/root.css']
]);
const allowedSubpaths = new Set([...exactTargets.keys(), ...styleTargets.keys(), componentPattern]);

for (const [subpath, target] of entries) {
	if (!allowedSubpaths.has(subpath)) failures.push(`${subpath}: undeclared package seam`);
	if (subpath.includes('*') && subpath !== componentPattern) {
		failures.push(`${subpath}: only ${componentPattern} may use a wildcard`);
	}
	if (target === null) {
		failures.push(`${subpath}: null export is forbidden`);
		continue;
	}
	if (!target || typeof target !== 'object' || Array.isArray(target)) {
		failures.push(`${subpath}: target must be a condition object`);
		continue;
	}

	const conditions = Object.keys(target);
	const expectedConditions = subpath.startsWith('./styles/')
		? ['style', 'svelte', 'default']
		: ['types', 'svelte', 'default'];
	if (JSON.stringify(conditions) !== JSON.stringify(expectedConditions)) {
		failures.push(`${subpath}: expected conditions in order ${expectedConditions.join(', ')}`);
	}

	for (const [condition, value] of Object.entries(target)) {
		if (typeof value !== 'string') {
			failures.push(`${subpath}[${condition}]: target must be a string`);
			continue;
		}
		const hasWildcard = value.includes('*');
		if (hasWildcard !== (subpath === componentPattern)) {
			failures.push(
				`${subpath}[${condition}]: wildcard targets are reserved for ${componentPattern}`
			);
		}
		if (!hasWildcard) {
			try {
				await access(path.join(root, value));
			} catch {
				failures.push(`${subpath}[${condition}]: missing ${value}`);
			}
		}
	}

	if (typeof target.svelte === 'string' && target.default !== target.svelte) {
		failures.push(`${subpath}: svelte and default targets must match`);
	}
	if (
		typeof target.types === 'string' &&
		typeof target.default === 'string' &&
		target.types.replace(/\.d\.ts$/, '') !== target.default.replace(/\.js$/, '')
	) {
		failures.push(`${subpath}: runtime and declaration targets must share a stem`);
	}
}

for (const [subpath, stem] of exactTargets) {
	const target = pkg.exports?.[subpath];
	if (!target) {
		failures.push(`${subpath}: required package seam is missing`);
		continue;
	}
	if (target.default !== `${stem}.js` || target.types !== `${stem}.d.ts`) {
		failures.push(`${subpath}: expected runtime and declarations at ${stem}`);
	}
}

for (const [subpath, file] of styleTargets) {
	const target = pkg.exports?.[subpath];
	if (!target) {
		failures.push(`${subpath}: required style seam is missing`);
		continue;
	}
	if (target.style !== file || target.svelte !== file || target.default !== file) {
		failures.push(`${subpath}: expected all conditions to target ${file}`);
	}
}

for (const denied of ['./context', './types', './menu', './dropdown', './virtual', './internal']) {
	if (denied in (pkg.exports ?? {})) {
		failures.push(`${denied}: internal/obsolete path must not be exported`);
	}
}

async function listFiles(directory, prefix = '') {
	const files = [];
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
		if (entry.isDirectory()) {
			files.push(...(await listFiles(path.join(directory, entry.name), relative)));
		} else {
			files.push(relative);
		}
	}
	return files;
}

const facadeDirectory = path.join(root, 'src/lib/public/components');
const facadeFiles = (await listFiles(facadeDirectory)).filter((name) => name.endsWith('.ts'));
const componentTarget = pkg.exports?.[componentPattern];
const expectedComponentTarget = {
	types: './dist/public/components/*.d.ts',
	svelte: './dist/public/components/*.js',
	default: './dist/public/components/*.js'
};

if (!componentTarget) {
	failures.push(`${componentPattern}: component export pattern is missing`);
} else if (JSON.stringify(componentTarget) !== JSON.stringify(expectedComponentTarget)) {
	failures.push(`${componentPattern}: component export pattern targets are incorrect`);
}

for (const facade of facadeFiles) {
	const stem = facade.slice(0, -3);
	for (const [condition, pattern] of Object.entries(expectedComponentTarget)) {
		const value = pattern.replace('*', stem);
		try {
			await access(path.join(root, value));
		} catch {
			failures.push(`./components/${stem}[${condition}]: missing ${value}`);
		}
	}
}

if (failures.length) {
	console.error(failures.join('\n'));
	process.exit(1);
}
console.log(
	`Verified ${entries.length} package exports and ${facadeFiles.length} component facades through ${componentPattern}.`
);
