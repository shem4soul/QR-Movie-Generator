"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "public"));
    app.setBaseViewsDir((0, path_1.join)(__dirname, "..", "views"));
    app.setViewEngine("ejs");
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    console.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();
