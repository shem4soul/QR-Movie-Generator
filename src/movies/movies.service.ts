import { Injectable } from "@nestjs/common";
import data from "./movies.json"; 

@Injectable()
export class MoviesService {
  private storage = new Map<string, any[]>();
  private movies = data; 

  getRandomMovies(count: number) {
    const shuffled = [...this.movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  storeMovies(token: string, movies: any[]) {
    this.storage.set(token, movies);
  }

  getMoviesByToken(token: string): any[] {
    return this.storage.get(token) || [];
  }

  getMovieByImdbID(imdbID: string) {
    return this.movies.find((movie) => movie.imdbID === imdbID);
  }
}

// import { Injectable } from "@nestjs/common";
// import data from "./movies.json";

// @Injectable()
// export class MoviesService {
//   private storage = new Map<string, any[]>();

//   getRandomMovies(count: number) {
//     const movies = (data as any).movies;
//     const shuffled = [...movies].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
//   }

//   storeMovies(token: string, movies: any[]) {
//     this.storage.set(token, movies);
//   }

//   getMoviesByToken(token: string): any[] {
//     return this.storage.get(token) || [];
//   }
// }
