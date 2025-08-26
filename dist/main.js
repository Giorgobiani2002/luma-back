"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
async function bootstrap() {
    const AppModule = await (0, app_module_1.createAppModule)();
    const server = (0, express_1.default)();
    const app = await core_1.NestFactory.create(AppModule, new platform_express_1.ExpressAdapter(server));
    app.enableCors();
    await app.listen(process.env.PORT ?? 3001);
    console.log(`🚀 AdminJS: http://localhost:${process.env.PORT ?? 3001}/admin`);
}
bootstrap();
//# sourceMappingURL=main.js.map