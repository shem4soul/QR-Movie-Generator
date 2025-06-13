import { Controller, Get, Param } from "@nestjs/common";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // ✅ 1. Single movie by imdbID
  @Get(":imdbID")
  getMovie(@Param("imdbID") imdbID: string) {
    const movie = this.moviesService.getMovieByImdbID(imdbID);
    if (!movie) {
      return { message: "Movie not found" };
    }
    return { movie };
  }

  // ✅ 2. Movies batch by token (used after QR code scan)
  @Get("batch/:token")
  getMoviesByToken(@Param("token") token: string) {
    const movies = this.moviesService.getMoviesByToken(token);
    if (!movies || movies.length === 0) {
      return { message: "No movies found for this token" };
    }

    // Optional: Return only basic info (title, poster, imdbID)
    const simplified = movies.map((movie) => ({
      title: movie.Title,
      poster: movie.Poster || movie.Images?.[0] || null,
      imdbID: movie.imdbID,
    }));

    return { movies: simplified };
  }
}

// import { Controller, Get, Param } from "@nestjs/common";
// import { MoviesService } from "./movies.service";

// @Controller("movies")
// export class MoviesController {
//   constructor(private readonly moviesService: MoviesService) {}

//   @Get(":imdbID")
//   getMovie(@Param("imdbID") imdbID: string) {
//     const movie = this.moviesService.getMovieByImdbID(imdbID);
//     if (!movie) {
//       return { message: "Movie not found" };
//     }
//     return { movie };
//   }
// }
