import { createParamDecorator } from '@nestjs/common';

export const Validate = createParamDecorator((data, req) => {
  return req.nestjsValidate;
});
