
import { Context, Callback, Handler } from 'aws-lambda';
import { createUserFollow, deleteUserFollow, getUserFollows, getUserFollowers } from '../../../model/userfollow';

/**
 *  유저 팔로우 추가
 */
export const postUserFollowAPI: Handler = async (event: any, context: Context, callback: Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return await createUserFollow(event)
};

/**
 *  팔로우 삭제
 */
 export const deleteUserFollowAPI: Handler = async (event: any, context: Context, callback: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await deleteUserFollow(event)
};

/**
 *  팔로우 목록
 */
export const getUserFollowsAPI: Handler = async (event: any, context: Context, callback: Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return await getUserFollows(event)
};


/**
 *  팔로워 목록
 */
 export const getUserFollowersAPI: Handler = async (event: any, context: Context, callback: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await getUserFollowers(event)
  };
