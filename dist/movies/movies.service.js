"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
let MoviesService = class MoviesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    // Seed movies from a JSON file
    async seedMovies(moviesData) {
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
    async getMovieByImdbID(imdbID) {
        return this.prisma.movie.findUnique({ where: { imdbID } });
    }
    // Create a batch of 10 random movies
    async createMovieBatch() {
        const movies = await this.prisma.movie.findMany();
        const shuffled = movies.sort(() => 0.5 - Math.random()).slice(0, 10);
        const token = (0, uuid_1.v4)();
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
    async getMoviesByToken(token) {
        const batch = await this.prisma.batch.findUnique({
            where: { token },
            include: {
                movies: {
                    include: { movie: true },
                },
            },
        });
        if (!batch)
            return [];
        return batch.movies.map((bm) => bm.movie);
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MoviesService);
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
