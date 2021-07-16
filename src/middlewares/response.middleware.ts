import { HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const ok = function <T>(message?: T): void {
  return this.status(HttpStatus.OK).json(message);
};
const unauthorized = function <T>(message?: T): void {
  return this.status(HttpStatus.UNAUTHORIZED).json(message);
};
const badRequest = function <T>(message?: T): void {
  return this.status(HttpStatus.BAD_REQUEST).json(message);
};
const created = function <T>(message?: T): void {
  return this.status(HttpStatus.CREATED).json(message);
};
const noContent = function <T>(message?: T): void {
  return this.status(HttpStatus.NO_CONTENT).json(message);
};
const movedPermanently = function <T>(message?: T): void {
  return this.status(HttpStatus.MOVED_PERMANENTLY).json(message);
};
const paymentRequired = function <T>(message?: T): void {
  return this.status(HttpStatus.PAYMENT_REQUIRED).json(message);
};
const forbidden = function <T>(message?: T): void {
  return this.status(HttpStatus.FORBIDDEN).json(message);
};
const notFound = function <T>(message?: T): void {
  return this.status(HttpStatus.NOT_FOUND).json(message);
};
const conflict = function <T>(message?: T): void {
  return this.status(HttpStatus.CONFLICT).json(message);
};
const internalServerError = function <T>(message?: T): void {
  return this.status(HttpStatus.INTERNAL_SERVER_ERROR).json(message);
};
const badGateway = function <T>(message?: T): void {
  return this.status(HttpStatus.BAD_GATEWAY).json(message);
};

export const responseMiddleware = (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  res.ok = ok;
  res.unauthorized = unauthorized;
  res.badRequest = badRequest;
  res.created = created;
  res.noContent = noContent;
  res.movedPermanently = movedPermanently;
  res.paymentRequired = paymentRequired;
  res.forbidden = forbidden;
  res.notFound = notFound;
  res.conflict = conflict;
  res.internalServerError = internalServerError;
  res.badGateway = badGateway;

  next();
};
