import { Handler } from 'aws-lambda';

/**
 *  프로필 이미지
 */
export const modifyProfileImage: Handler = (event, context, callback) => {
  // ?
  context.callbackWaitsForEmptyEventLoop = false;
};

/**
 *  프로필 이름
 */
export const modifyProfileName: Handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
};

/**
 *  프로필 소개
 */
export const modifyProfileDescription: Handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
};
