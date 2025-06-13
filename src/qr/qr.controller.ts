import { Controller, Get, Render } from "@nestjs/common";
import { QrService } from "./qr.service";

@Controller("qr")
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Get()
  @Render("qr")
  async showQr() {
    const { qrImage, token } = await this.qrService.generateQrCode();
    return { qrImage, token };
  }
}
