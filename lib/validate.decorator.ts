import { createParamDecorator } from '@nestjs/common';

export const Validate = createParamDecorator((data, req) => {
  return req["args"][0]["nestjsValidate"];
});
