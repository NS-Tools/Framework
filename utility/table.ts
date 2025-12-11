import type { NetsuiteCurrentRecord } from '../DataAccess/Record';

/**
 * Definition of for each column in a table.
 */
export interface Column {
	/**
	 * Human readable label for the column to be used in headers
	 */
	label: string;

	/**
	 * Key of the column in the data rows. Use dot notation for nested keys.
	 */
	key: string;
}

/**
 * Table rendering formats available for output.
 */
export enum TableFormat {
	CSV = 'csv',
	CUSTOM = 'custom',
	HTML = 'html',
}

/**
 * Table utility to render tabular data in various formats.
 *
 * @example of creating a CSV table
 * const table = new Table(
 *     [
 *         { label: 'Internal ID', key: 'id' },
 *         { label: 'Name', key: 'name' },
 *     ],
 *     [
 *         { id: 1, name: 'Alice' },
 *         { id: 2, name: 'Bob' },
 *     ],
 * );
 *
 * const csv = table.render(TableFormat.CSV);
 *
 * @example of creating a HTML table with nested data
 * const table = new Table(
 *     [
 *         { label: 'Internal ID', key: 'id' },
 *         { label: 'Name', key: 'details.name' },
 *     ],
 *     [
 *         { id: 1, details: { name: 'Alice' } },
 *         { id: 2, details: { name: 'Bob' } },
 *     ],
 * );
 *
 * const html = table.render(TableFormat.HTML);
 */
export class Table {
	/**
	 * Table Constructor
	 *
	 * Note: At least one column and one row must be defined.
	 *
	 * @throws Error if no columns or no data rows are provided
	 * @param columns array of columns for rendering the data
	 * @param data array of rows containing the data to be rendered
	 */
	constructor(
		private columns: Column[],
		private data: object[] | NetsuiteCurrentRecord[],
	) {
		if (!columns || columns.length === 0) {
			throw new Error('At least one column must be defined.');
		}

		if (!data || data.length === 0) {
			throw new Error('At least one row must be defined.');
		}
	}

	/**
	 * Renders the table in the requested format
	 *
	 * @throws Error if an unsupported format is used, or if a CUSTOM format is used, and no custom renderer is provided.
	 * @param format Currently supports CSV, HTML, and the ability to load your own custom renderer
	 * @param custom Optional parameter to provide a class reference for a custom TableRender derived class. Only used when TableFormat.CUSTOM is used.
	 */
	render(format: TableFormat, custom?: any): string {
		let render: TableRender;

		switch (format) {
			case TableFormat.CSV:
				render = new TableRenderCSV(this.columns, this.data);
				break;
			case TableFormat.HTML:
				render = new TableRenderHtml(this.columns, this.data);
				break;
			case TableFormat.CUSTOM:
				if (!custom) throw new Error('Custom TableRender class reference must be provided for CUSTOM format');
				render = new custom(this.columns, this.data);
				break;
			default:
				throw new Error(`Unsupported table format: ${format}`);
		}

		return render.render();
	}
}

/**
 * Base class for Table renderers. Use this with render format `CUSTOM`.
 *
 * You are not meant to use TableRender directly, instead pass it as a class reference to Table.render.
 */
export class TableRender {
	/**
	 * Key of the last column in the table. Useful for determining which delimiter should be used if any.
	 */
	protected lastColumnKey: string;

	/**
	 * @param columns Column array automatically passed by Table.
	 * @param data Row data array automatically passed by Table.
	 */
	constructor(
		protected columns: Column[],
		protected data: object[],
	) {
		this.lastColumnKey = this.columns[this.columns.length - 1].key;
	}

	/**
	 * Renders the table. You must override this method in your derived class.
	 */
	render(): string {
		return 'You probably meant to override this method in a derived class.';
	}

	/**
	 * Internal function to get the volue of a column from a row object.
	 *
	 * @param key Key to access object row data in dot separated format. Example: 'details.name' will return row.details.name.
	 * @param row The current object being processed.
	 * @returns
	 */
	protected getColumnValue(key: string, row: any): any {
		const keys = key.split('.');
		let data = row;

		for (const currentKey of keys) {
			data = data[currentKey];
		}

		return data;
	}
}

/**
 * HTML Table Renderer
 */
class TableRenderHtml extends TableRender {
	override render(): string {
		return `<table><thead><tr>${this.header()}</tr></thead><tbody>${this.row()}</tbody></table>`;
	}

	private header(): string {
		return this.columns.map((column) => `<th>${column.label}</th>`).join('');
	}

	private row(): string {
		return this.data
			.map((currentRow) => {
				const rowString = this.columns
					.map((column) => {
						return `<td>${this.getColumnValue(column.key, currentRow)}</td>`;
					})
					.join('');

				return `<tr>${rowString}</tr>`;
			})
			.join('');
	}
}

/**
 * CSV Table Renderer
 */
class TableRenderCSV extends TableRender {
	override render(): string {
		return `${this.header()}\n${this.row()}`;
	}

	private header(): string {
		let headerString = '';

		for (const column of this.columns) {
			headerString += `${column.label}`;

			if (column.key !== this.lastColumnKey) {
				headerString += ',';
			}
		}

		return headerString;
	}

	private row(): string {
		let rowsString = '';

		for (const currentRow of this.data) {
			let rowString = '';

			for (const column of this.columns) {
				rowString += `"${String(this.getColumnValue(column.key, currentRow)).replace(/"/g, '""')}"`;

				if (column.key !== this.lastColumnKey) {
					rowString += ',';
				} else {
					rowString += '\n';
				}
			}

			rowsString += rowString;
		}

		return rowsString;
	}
}
