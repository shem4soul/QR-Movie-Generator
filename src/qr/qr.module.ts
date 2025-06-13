import { Module } from "@nestjs/common";
import { QrController } from "./qr.controller";
import { QrService } from "./qr.service";
import { MoviesModule } from "../movies/movies.module";

@Module({
  imports: [MoviesModule],
  controllers: [QrController],
  providers: [QrService],
})
export class QrModule {}
