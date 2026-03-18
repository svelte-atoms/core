export interface Frontmatter {
	id: string;
	title: string;
	category: string;
	subcategory?: string;
	depth: 'beginner' | 'intermediate' | 'detailed' | 'foundational' | 'advanced';
	prerequisites: string[];
	related: string[];
}
