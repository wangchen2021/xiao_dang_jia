import { Controller, Get } from '@nestjs/common';
import { CosService } from './cos.service';

@Controller('cos')
export class CosController {
  constructor(private readonly cosService: CosService) { }
  @Get('sts')
  async getStsToken() {
    const token = await this.cosService.getCosStsToken();
    return token
  }
}
