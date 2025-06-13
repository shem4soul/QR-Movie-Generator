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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const movies_service_1 = require("./movies.service");
let MoviesController = class MoviesController {
    constructor(moviesService) {
        this.moviesService = moviesService;
    }
    getMovie(imdbID) {
        const movie = this.moviesService.getMovieByImdbID(imdbID);
        if (!movie) {
            return { message: "Movie not found" };
        }
        return { movie };
    }
};
exports.MoviesController = MoviesController;
__decorate([
    (0, common_1.Get)(":imdbID"),
    __param(0, (0, common_1.Param)("imdbID")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "getMovie", null);
exports.MoviesController = MoviesController = __decorate([
    (0, common_1.Controller)("movies"),
    __metadata("design:paramtypes", [movies_service_1.MoviesService])
], MoviesController);
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
