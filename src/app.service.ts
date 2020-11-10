import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): HttpStatus.OK {
    return HttpStatus.OK;
  }
}
