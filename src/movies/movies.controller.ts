import { Controller, Get, Param } from "@nestjs/common";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(":imdbID")
  getMovie(@Param("imdbID") imdbID: string) {
    const movie = this.moviesService.getMovieByImdbID(imdbID);
    if (!movie) {
      return { message: "Movie not found" };
    }
    return { movie };
  }
}

// import { MoviesService } from "./movies.service";

// @Controller("movies")
// export class MoviesController {
//   constructor(private readonly moviesService: MoviesService) {}

//   @Get(":token")
//   @Render("movies")
//   getMovies(@Param("token") token: string) {
//     const movies = this.moviesService.getMoviesByToken(token);
//     return { movies };
//   }
// }
