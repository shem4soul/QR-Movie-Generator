import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import * as QRCode from "qrcode";
import { MoviesService } from "../movies/movies.service";

@Injectable()
export class QrService {
  constructor(private readonly moviesService: MoviesService) {}

  async generateQrCode(): Promise<{ qrImage: string; token: string }> {
    const token = uuidv4();
    const movies = this.moviesService.getRandomMovies(10);
    this.moviesService.storeMovies(token, movies);

    const url = `http://localhost:3000/movies/${token}`;
    const qrImage = await QRCode.toDataURL(url);
    return { qrImage, token };
  }
}
