import { Injectable, NestMiddleware } from '@nestjs/common';
import { resolve, join } from 'path';


@Injectable()
export class ApiMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.headers.accept == 'application/json') {
      return next();
    } else {
      return res.sendFile(resolve(join(__dirname, '..', '../views/index.html')));
    }
  }
}
