"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_entity_1 = require("../auth/entities/register.entity");
exports.default = () => ({
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [register_entity_1.Register],
    synchronize: true,
});
//# sourceMappingURL=db.config.js.map