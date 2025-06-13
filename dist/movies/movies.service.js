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
    }
    getRandomMovies(count) {
        const movies = movies_json_1.default.movies;
        const shuffled = [...movies].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    storeMovies(token, movies) {
        this.storage.set(token, movies);
    }
    getMoviesByToken(token) {
        return this.storage.get(token) || [];
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)()
], MoviesService);
