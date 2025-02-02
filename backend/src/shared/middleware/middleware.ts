import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: Error) => void) {
    const headers = req.headers?.authorization?.split(" ");
    if (!headers) {
      throw new UnauthorizedException("Not Authorized");
    } else {
      if (
        headers[0] === "Bearer" &&
        jwt.verify(headers[1], JSON.stringify(process.env.SECRET_KEY))
      ) {
        return next();
      } else {
        throw new BadRequestException("Invalid Token");
      }
    }
  }
}
