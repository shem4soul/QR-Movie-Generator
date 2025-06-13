import { Injectable } from "@nestjs/common";
import * as QRCode from "qrcode";
import { MoviesService } from "../movies/movies.service";

@Injectable()
export class QrService {
  constructor(private readonly moviesService: MoviesService) {}

  async generateQrCode(): Promise<{ qrImage: string; token: string }> {
    // Step 1: Create a new batch of 10 random movies and get the token
    const { token } = await this.moviesService.createMovieBatch();

    // Step 2: Generate a QR code for the frontend URL
    const url = `http://localhost:3000/movies/${token}`; // change to your actual frontend route
    const qrImage = await QRCode.toDataURL(url);

    return { qrImage, token };
  }
}
