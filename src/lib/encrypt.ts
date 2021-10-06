import * as jwt from 'jsonwebtoken';

export const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY as string, {
    subject: 'access_token',
    expiresIn: '120m',
  });
};

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY as string, {
    subject: 'refresh_token',
    expiresIn: '29d',
  });
};

export const splitByDelimiter = (data: string, delim: string) => {
  const pos = data ? data.indexOf(delim) : -1;
  return pos > 0 ? [data.substr(0, pos), data.substr(pos + 1)] : ['', ''];
};

export const decodeBase64 = (input: string) =>
  Buffer.from(input, 'base64').toString('utf8');
