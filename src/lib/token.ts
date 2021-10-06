import {  Context } from "aws-lambda";

export function setTokenCookie(
    ctx: Context,
    tokens: { accessToken: string; refreshToken: string }
  ) {
    // set cookie
    ctx.cookies.set('access_token', tokens.accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      domain: 'browny.id'
    });
  
    ctx.cookies.set('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      domain: 'browny.id'
    });
  
  }
  