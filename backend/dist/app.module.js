"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const dotenv = require("dotenv");
const db_config_1 = require("./config/db.config");
const middleware_1 = require("./shared/middleware/middleware");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
dotenv.config();
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(middleware_1.AuthMiddleware)
            .exclude({ path: "auth/login", method: common_1.RequestMethod.POST }, { path: "auth/register", method: common_1.RequestMethod.POST })
            .forRoutes("*");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [db_config_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: db_config_1.default,
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 10 * 1000,
                    limit: 5,
                },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            core_1.Reflector,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map