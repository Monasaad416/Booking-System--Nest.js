import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CountriesModule } from './modules/countries/country.module';
import { CitiesModule } from './modules/cities/cities.module';

@Module({
  imports: [CoreModule, UsersModule, AuthModule, CountriesModule, CitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
