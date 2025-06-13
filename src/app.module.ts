import { Module } from "@nestjs/common";
import { QrModule } from "./qr/qr.module";
import { MoviesModule } from "./movies/movies.module";

@Module({
  imports: [QrModule, MoviesModule],
})
export class AppModule {}
