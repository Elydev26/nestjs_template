import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    Logger.log({ body: req.body, res: res.status, next });
    return true;
  }
}
