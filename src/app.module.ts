import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { QrModule } from "./qr/qr.module";
import { MoviesModule } from "./movies/movies.module";
import { AppController } from "./app.controller"; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    QrModule,
    MoviesModule,
  ],
  controllers: [AppController], 
})
export class AppModule {}
