export interface ColumnDefinition<T> {
	name: string;
	accessor: (item: T) => string;
	format?: (value: string) => string;
}

export function table<T>(data: T[], columns: ColumnDefinition<T>[]): string {
	// Create header row
	const headers = columns.map((col) => col.name).join(' | ');
	const separator = columns.map(() => '---').join(' | ');
	
	// Create data rows
	const rows = data.map((item) => {
		const cells = columns.map((col) => {
			const value = col.accessor(item);
			return col.format ? col.format(value) : value;
		});
		return cells.join(' | ');
	});
	
	return `| ${headers} |\n| ${separator} |\n${rows.map(row => `| ${row} |`).join('\n')}`;
}
