import { ClassConstructor, plainToInstance } from 'class-transformer';

type MongooseDocument = {
  toObject(options: { getters: boolean }): object;
};

export function mapDocumentResponse<T>(
  dto: ClassConstructor<T>,
  document: MongooseDocument,
): T {
  return plainToInstance(dto, document.toObject({ getters: true }), {
    excludeExtraneousValues: true,
  });
}
