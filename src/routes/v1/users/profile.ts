import { Context, Callback, Handler } from 'aws-lambda';
import { updateProfileThumnail, updateProfile } from '../../../model/user';

/**
 *  프로필 이미지 삭제
 */
export const deleteProfileImage: Handler = async (event: any, context: Context, callback: Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user_id = event.path.user_id;
  const uploadPath = null;
  return await updateProfileThumnail(user_id, uploadPath)
};


/**
 *  프로필 수정
 */
export const putProfile: Handler = async (event: any, context: Context, callback: Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user_id = event.path.user_id;
  const body = event.body
  return await updateProfile(user_id, body)
};

