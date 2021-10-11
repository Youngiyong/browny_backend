import { Context, Callback, Handler } from 'aws-lambda';
import { uploadImage } from "../../../lib/upload";
import { parse } from 'aws-lambda-multipart-parser';

export const run: Handler = async (event: any, context: Context, callback: Callback) => {
    const folder  = event.pathParameters.folder
    const user_id = event.pathParameters.user_id
    console.log(event)
    return await uploadImage(folder, user_id, parse(event, true));
}

