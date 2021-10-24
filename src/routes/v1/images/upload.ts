import { Context, Callback, Handler } from 'aws-lambda';
import { uploadImage } from "../../../lib/upload";
import  { verifyAccessToken } from  "../../../lib/token"
import { parse } from 'aws-lambda-multipart-parser';
import { DeplMsgResponse } from '../../../lib/response';

export const run: Handler = async (event: any, context: Context, callback: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const folder  = event.pathParameters.folder
    const user = verifyAccessToken(event);
    return user ? await uploadImage(folder, user, parse(event, true)) : DeplMsgResponse(400, 'Invalid Access token Request');
}

