import { Context, Callback, Handler } from 'aws-lambda';
import { uploadImage } from "../../../lib/upload";
export const run: Handler = async (event: any, context: Context, callback: Callback) => {
	context.callbackWaitsForEmptyEventLoop = false;
//     // var params = queryString.parse(event.body)
    console.log(event.body)
    return JSON.parse(event.body)
}
//     // const folder  = event.pathParameters.folder
//     // const user_id = event.pathParameters.user_id
//     // console.log("foleder:", folder, "user_id", user_id)
//     var params = queryString.parse(event.body)
//     // console.log(params.name)
//     // console.log(params.type)
//     console.log(params.name)
//     // return await uploadImage(folder, user_id, event.body);
//     return params.name
// };


