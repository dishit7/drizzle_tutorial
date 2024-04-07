"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var postgres_js_1 = require("drizzle-orm/postgres-js");
var schema = require("./schema");
var postgres_1 = require("postgres");
var client =  (process.env.DATABASE_URL);
exports.db = (0, postgres_js_1.drizzle)(client, { schema: schema, logger: true });
