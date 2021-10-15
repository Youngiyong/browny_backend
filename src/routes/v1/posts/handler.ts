import { Callback, Context, Handler } from 'aws-lambda';
import { getPosts, writePost } from '../../../model/post';

export const getPostsAPI: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return await getPosts(event);
};

export const writePostAPI: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return await writePost(event);
};
