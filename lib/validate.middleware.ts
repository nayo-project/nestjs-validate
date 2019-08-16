import { Request, Response } from 'express';
import * as validate from 'express-validator';
import * as _ from 'underscore';
import * as pathToRegexp from 'path-to-regexp';

export function validateMiddleware(validateConfig) {
  const validateList: any = [];
  for (const validateItem of validateConfig) {
    validateList.push({
      path: pathToRegexp(validateItem.path),
      schema: validateItem.schema,
    });
  }
  return (req, res, next) => {
    const validateItem = _.find(validateList, (item) => {
      return item.path.test(req.baseUrl);
    });
    if (validateItem) {
      const schema = validate.checkSchema(validateItem.schema);
      Promise.all(schema.map(validation => validation.run(req))).then(v => {
        const errors = validate.validationResult(req);
        if (errors.isEmpty()) {
          req.nestjsValidate = [];
        }
        req.nestjsValidate = errors.array();
        next();
      }).catch(e => {
        res.status(500).end('Server Error');
      });
    } else {
      next();
    }
  };
}
