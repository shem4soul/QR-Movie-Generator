"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Enable CORS
    app.enableCors();
    // Serve static assets and views
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "public"));
    app.setBaseViewsDir((0, path_1.join)(__dirname, "..", "views"));
    app.setViewEngine("ejs");
    // Swagger setup
    const config = new swagger_1.DocumentBuilder()
        .setTitle("QR Movie Generator API")
        .setDescription("API for generating QR codes and retrieving movie batches")
        .setVersion("1.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📚 Swagger docs available at http://localhost:${PORT}/api`);
}
bootstrap();
// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "./app.module";
// import { NestExpressApplication } from "@nestjs/platform-express";
// import { join } from "path";
// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//   app.useStaticAssets(join(__dirname, "..", "public"));
//   app.setBaseViewsDir(join(__dirname, "..", "views"));
//   app.setViewEngine("ejs");
//   const PORT = process.env.PORT || 3000;
//   await app.listen(PORT);
//   console.log(`Server running on http://localhost:${PORT}`);
// }
// bootstrap();
