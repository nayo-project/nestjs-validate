# nestjs-validate
The validate for nestjs

the document will come soon, you can have a look at the express-validator for learning the validate schema
https://express-validator.github.io/docs/index.html

### version limit
nestjs >= 8.0.0

```
Example:
import * as validate from 'nestjs-validate';

// test.module.ts
@Module({
  imports: [validate.forFeature([
    {path: '/user/create', schema: { username: { isEmail: true } }},
    // the schema is the same as the schema of express-validate
  ])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}

//  test.service.ts
import { Validate } from 'nestjs-validate';
...
@Post('create')
create(@Req() req, @Res() res, @Validate() validate) {
    console.log(validate);  // if params validate pass, validate's value will be []
    res.end('ok');
}
```
