import { ClassConstructor, plainToInstance } from 'class-transformer';

export function mapCountryResponse<T>(
  dto: ClassConstructor<T>,
  country: { toObject(options: { getters: boolean }): object },
): T {
  return plainToInstance(dto, country.toObject({ getters: true }), {
    excludeExtraneousValues: true,
  });
}
