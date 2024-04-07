"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategoryTable = exports.CategoryTable = exports.PostTable = exports.userPreferencesTable = exports.UserTable = exports.userRole = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.userRole = (0, pg_core_1.pgEnum)("userRole", ["ADMIN", "BASIC"]);
exports.UserTable = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    age: (0, pg_core_1.integer)("age").notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    role: (0, exports.userRole)("userRole").default("BASIC").notNull()
}, function (table) {
    return {
        emailIndex: (0, pg_core_1.uniqueIndex)("emailIndex").on(table.email),
        uniqueNameAndAge: (0, pg_core_1.uniqueIndex)("uniqueNameAndAge").on(table.name, table.age)
    };
});
exports.userPreferencesTable = (0, pg_core_1.pgTable)("userPreferences", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    emailUpdates: (0, pg_core_1.boolean)("emailUpdates").notNull().default(false),
    userId: (0, pg_core_1.uuid)("userId").references(function () { return exports.UserTable.id; }).notNull()
});
exports.PostTable = (0, pg_core_1.pgTable)("post", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    averageRating: (0, pg_core_1.real)("averageRating").notNull().default(0),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").defaultNow().notNull(),
    authorId: (0, pg_core_1.uuid)("authorId")
        .references(function () { return exports.UserTable.id; })
        .notNull(),
});
exports.CategoryTable = (0, pg_core_1.pgTable)("category", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull()
});
exports.PostCategoryTable = (0, pg_core_1.pgTable)("postCategory", {
    postId: (0, pg_core_1.uuid)("postId").references(function () { return exports.PostTable.id; }),
    categoryId: (0, pg_core_1.uuid)("categoryId")
        .references(function () { return exports.CategoryTable.id; })
        .notNull(),
}, function (table) {
    return {
        pk: (0, pg_core_1.primaryKey)({ columns: [table.postId, table.categoryId] }),
    };
});
