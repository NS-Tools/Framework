import { Table, Column, TableFormat, TableRender } from '../utility/table';

describe('Table', () => {
    class CustomRender extends TableRender {
        render(): string {
            return `${this.header()}\n${this.rows()}`;
        }

        private header(): string {
            return `${this.columns.map(column => column.label)}|`;
        }

        private rows(): string {
            return this.data.map(row => {
                return this.columns.map(column => this.getColumnValue(column.key, row));
            }).join('|');
        }
    }

    test('It should support basic object arrays', () => {
        const columns: Column[] = [
            { label: 'ID', key: 'id' },
            { label: 'Name', key: 'name' },
            { label: 'Age', key: 'age' },
        ];
        const data = [
            { id: 1, name: 'Alice', age: 30 },
            { id: 2, name: 'Bob', age: 25 },
            { id: 3, name: 'Charlie', age: 35 },
        ];
        const table = new Table(columns, data);
        const result = table.render(TableFormat.CUSTOM, CustomRender);
        
        expect(result).toBeDefined();
        expect(result).toEqual(`ID,Name,Age|\n1,Alice,30|2,Bob,25|3,Charlie,35`);
    });

    test('It should support basic multi dimensional keys', () => {
        const columns: Column[] = [
            { label: 'ID', key: 'id' },
            { label: 'Name', key: 'details.name' },
            { label: 'Age', key: 'details.age' },
        ];
        const data = [
            { id: 1, details: { name: 'Alice', age: 30 } },
            { id: 2, details: { name: 'Bob', age: 25 } },
            { id: 3, details: { name: 'Charlie', age: 35 } },
        ];
        const table = new Table(columns, data);
        const result = table.render(TableFormat.CUSTOM, CustomRender);
        
        expect(result).toBeDefined();
        expect(result).toEqual(`ID,Name,Age|\n1,Alice,30|2,Bob,25|3,Charlie,35`);
    });

    it('should correctly render a csv', () => {
        const columns: Column[] = [
            { label: 'ID', key: 'id' },
            { label: 'Name', key: 'name' },
            { label: 'Age', key: 'age' },
        ];
        const data = [
            { id: 1, name: 'Alice', age: 30 },
            { id: 2, name: 'Bob', age: 25 },
            { id: 3, name: 'Charlie"s', age: 35 },
        ];
        const table = new Table(columns, data);
        const result = table.render(TableFormat.CSV);
        
        expect(result).toBeDefined();
        expect(result).toEqual(`ID,Name,Age\n"1","Alice","30"\n"2","Bob","25"\n"3","Charlie""s","35"\n`);
    });

    it('should correctly render an html table', () => {
           const columns: Column[] = [
            { label: 'ID', key: 'id' },
            { label: 'Name', key: 'details.name' },
            { label: 'Age', key: 'details.age' },
        ];
        const data = [
            { id: 1, details: { name: 'Alice', age: 30 } },
            { id: 2, details: { name: 'Bob', age: 25 } },
            { id: 3, details: { name: 'Charlie', age: 35 } },
        ];
        const table = new Table(columns, data);
        const result = table.render(TableFormat.HTML);
        
        expect(result).toBeDefined();
        expect(result).toEqual(`<table><thead><tr><th>ID</th><th>Name</th><th>Age</th></tr></thead><tbody><tr><td>1</td><td>Alice</td><td>30</td></tr><tr><td>2</td><td>Bob</td><td>25</td></tr><tr><td>3</td><td>Charlie</td><td>35</td></tr></tbody></table>`);
    });

    it('should throw an error for unsupported formats', () => {
        function testThrow() {
            const columns: Column[] = [
                { label: 'ID', key: 'id' },
            ];
            const data = [
                { id: 1, details: { name: 'Alice', age: 30 } },
            ];
            const table = new Table(columns, data);
            table.render('INVALID_FORMAT' as TableFormat)
        }
        
        expect(testThrow).toThrow('Unsupported table format: INVALID_FORMAT');
    });

    it('should throw an error if a custom renderer is not specified', () => {
        function testThrow() {
            const columns: Column[] = [
                { label: 'ID', key: 'id' },
            ];
            const data = [
                { id: 1, details: { name: 'Alice', age: 30 } },
            ];
            const table = new Table(columns, data);
            table.render(TableFormat.CUSTOM)
        }
        
        expect(testThrow).toThrow('Custom TableRender class reference must be provided for CUSTOM format');
    });

    it('should throw an error if no columns are provided', () => {
        function testThrow() {
            const columns: Column[] = [];
            const data = [
                { id: 1, details: { name: 'Alice', age: 30 } },
            ];
            new Table(columns, data);
        }
        
        expect(testThrow).toThrow('At least one column must be defined.');
    });

    it('should throw an error if no data is provided', () => {
        function testThrow() {
            const columns: Column[] = [
                { label: 'ID', key: 'id' },
            ];
            const data = [];
            new Table(columns, data);
        }
        
        expect(testThrow).toThrow('At least one row must be defined.');
    });

});