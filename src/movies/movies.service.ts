import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

import { Movie } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  // Seed movies from a JSON file
  async seedMovies(moviesData: any[]) {
    for (const movie of moviesData) {
      await this.prisma.movie.upsert({
        where: { imdbID: movie.imdbID },
        update: {},
        create: {
          imdbID: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster,
          year: movie.Year,
          rating: movie.Rated,
          plot: movie.Plot,
        },
      });
    }
  }

  // Get movie by imdbID
  async getMovieByImdbID(imdbID: string): Promise<Movie | null> {
    return this.prisma.movie.findUnique({ where: { imdbID } });
  }

  // Create a batch of 10 random movies
  async createMovieBatch(): Promise<{ token: string }> {
    const movies = await this.prisma.movie.findMany();
    const shuffled = movies.sort(() => 0.5 - Math.random()).slice(0, 10);
    const token = uuidv4();

    await this.prisma.batch.create({
      data: {
        token,
        movies: {
          create: shuffled.map((movie) => ({
            movie: {
              connect: { id: movie.id },
            },
          })),
        },
      },
    });

    return { token };
  }

  // Get movies using token
  async getMoviesByToken(token: string): Promise<Movie[]> {
    const batch = await this.prisma.batch.findUnique({
      where: { token },
      include: {
        movies: {
          include: { movie: true },
        },
      },
    });

    if (!batch) return [];

    return batch.movies.map((bm) => bm.movie);
  }
}
// import { Injectable } from "@nestjs/common";
// import data from "./movies.json";

// @Injectable()
// export class MoviesService {
//   private storage = new Map<string, any[]>();
//   private movies = data;

//   getRandomMovies(count: number) {
//     const shuffled = [...this.movies].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
//   }

//   storeMovies(token: string, movies: any[]) {
//     this.storage.set(token, movies);
//   }

//   getMoviesByToken(token: string): any[] {
//     return this.storage.get(token) || [];
//   }

//   getMovieByImdbID(imdbID: string) {
//     return this.movies.find((movie) => movie.imdbID === imdbID);
//   }
// }
