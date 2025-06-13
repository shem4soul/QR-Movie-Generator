"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const movies_json_1 = __importDefault(require("./movies.json"));
let MoviesService = class MoviesService {
    constructor() {
        this.storage = new Map();
        this.movies = movies_json_1.default;
    }
    getRandomMovies(count) {
        const shuffled = [...this.movies].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    storeMovies(token, movies) {
        this.storage.set(token, movies);
    }
    getMoviesByToken(token) {
        return this.storage.get(token) || [];
    }
    getMovieByImdbID(imdbID) {
        return this.movies.find((movie) => movie.imdbID === imdbID);
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)()
], MoviesService);
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
