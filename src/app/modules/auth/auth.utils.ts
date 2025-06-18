import { TJwtPayload } from './auth.interface';
import jwt from 'jsonwebtoken';

export const generateJwt = (
  jwtPayload: TJwtPayload,
  secret: string,
  expiry: string,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return jwt.sign(jwtPayload, secret, { expiresIn: expiry as any });
};
