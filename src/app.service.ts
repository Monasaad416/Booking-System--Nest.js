import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from './common/configurations/environment.interface';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService<EnvironmentInterface, true>,
  ) {}
  getHello(): string {
    return `Hello World! ${this.configService.get('port')}`;
  }
}
