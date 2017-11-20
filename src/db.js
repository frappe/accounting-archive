import jetpack from 'fs-jetpack';
import path from 'path';
import SQL from 'sql.js';

import frappe from './frappe';

export default class Database {
    init() {
        let db = this.open() || this.create_db();
        this._conn = db;
    }

    open() {
        const db_buffer = jetpack.read(this.db_path, 'buffer');
        if (!db_buffer) return null;
        return new SQL.Database(db_buffer);
    }

    close() {
        const db_handle = this._conn;
        try {
            let data = db_handle.export();
            let buffer = new Buffer(data);
            jetpack.write(this.db_path, buffer);
            db_handle.close();
            return true;
        } catch (error) {
            console.log("Can't close database file.", error.message);
            return null;
        }
    }

    create_db() {
        // Create a database.
        let db = new SQL.Database();
        let query = SCHEMA;
        let result = db.exec(query);
        if (Object.keys(result).length === 0 &&
            typeof result.constructor === 'function') {
            return db;
        } else {
            return null;
        }
    }

    sql(query, opts={}) {
        const result = frappe.db._conn.exec(query);
        if (result.length > 0) {
            if (opts.as_list)
                return result[0];
            else
                return sql_result_to_obj(result[0]);
        }
        return null;
    }

    get db_path() {
        return path.join(frappe.user_directory, 'temp', 'frappe.db');
    }
}

frappe.db = new Database();

// helpers

const SCHEMA = `
    CREATE TABLE "ToDo" (
        "name" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "subject" TEXT(255,0) NOT NULL,
        "description" TEXT(255,0) NOT NULL
    );
    INSERT INTO ToDo VALUES
        (NULL, "Buy Eggs", "Need 50 eggs for the next week"),
        (NULL, "Haircut", "Get a haircut");
`;

function sql_result_to_obj(result) {
    const columns = result.columns;
    return result.values.map(row => {
        return columns.reduce((res, col, i) => {
            res[col] = row[i];
            return res;
        }, {});
    })
}