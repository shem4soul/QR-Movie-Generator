import { Controller, Get, Param, Post } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { Movie } from "@prisma/client";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // Get a movie by IMDb ID
  @Get(":imdbID")
  async getMovie(
    @Param("imdbID") imdbID: string
  ): Promise<{ movie: Movie | null }> {
    const movie = await this.moviesService.getMovieByImdbID(imdbID);
    if (!movie) {
      return { movie: null }; // or throw NotFoundException if you prefer
    }
    return { movie };
  }

  // Create a batch of 10 random movies and return a token
  @Post("generate-batch")
  async generateBatch(): Promise<{ token: string }> {
    return this.moviesService.createMovieBatch();
  }

  // Retrieve movies by token
  @Get("batch/:token")
  async getBatchMovies(
    @Param("token") token: string
  ): Promise<{ movies: Movie[] }> {
    const movies = await this.moviesService.getMoviesByToken(token);
    return { movies };
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
