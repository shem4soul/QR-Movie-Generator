import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { QrModule } from "./qr/qr.module";
import { MoviesModule } from "./movies/movies.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    QrModule,
    MoviesModule,
  ],
})
export class AppModule {}
