import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getHome() {
    return {
      message: "🎬 Welcome to the QR Movie Generator API",
      usage: {
        get_movie_by_id: "/movies/:imdbID",
        generate_qr_code: "/qr",
      },
    };
  }
}
