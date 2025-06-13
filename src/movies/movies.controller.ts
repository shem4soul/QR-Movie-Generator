import { Controller, Get, Param, Render } from "@nestjs/common";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(":token")
  @Render("movies")
  getMovies(@Param("token") token: string) {
    const movies = this.moviesService.getMoviesByToken(token);
    return { movies };
  }
}
