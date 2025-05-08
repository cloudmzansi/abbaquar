import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers['authorization'];
    if (!auth || !auth.startsWith('Basic ')) {
      res.setHeader('WWW-Authenticate', 'Basic');
      throw new UnauthorizedException();
    }
    const base64Credentials = auth.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    if (username === 'admin' && password === 'pass') {
      next();
    } else {
      res.setHeader('WWW-Authenticate', 'Basic');
      throw new UnauthorizedException();
    }
  }
} 