import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CountriesModule } from './modules/countries/country.module';
import { CitiesModule } from './modules/cities/city.module';
import { CurrenciesModule } from './modules/currencies/currency.module';
import { UnitCategoriesModule } from './modules/unit-categories/unit-category.module';
import { GeneralSettingsModule } from './modules/general-setting/general-settings.module';
import { BookingSettingsModule } from './modules/booking-setting/booking-settings.module';
import { PaymentSettingsModule } from './modules/payment-setting/payment-settings.module';
import { CancellationSettingsModule } from './modules/cancellation-setting/cancellation-settings.module';
import { NotificationSettingsModule } from './modules/notification-setting/notification-settings.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    AuthModule,
    CountriesModule,
    CitiesModule,
    CurrenciesModule,
    UnitCategoriesModule,
    GeneralSettingsModule,
    BookingSettingsModule,
    PaymentSettingsModule,
    CancellationSettingsModule,
    NotificationSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
