import { DynamicModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { validateMiddleware } from './validate.middleware';

const pathconfig = Symbol('pathconfig');

@Module({})
export class ValidateModule implements NestModule {

  static [pathconfig]: any = [];

  configure(consumer: MiddlewareConsumer) {
    if (ValidateModule[pathconfig]) {
      consumer.apply(validateMiddleware(ValidateModule[pathconfig]))
        .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
  }

  static forFeature(
    validateConfigs: Array<{ path: string; schema: any }> = [],
  ): any {
    ValidateModule[pathconfig] = [...ValidateModule[pathconfig], ...validateConfigs];
    return ValidateModule;
  }
}
