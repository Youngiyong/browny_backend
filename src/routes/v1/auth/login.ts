import { Context, Callback, Handler } from 'aws-lambda';
import * as jwt from "jsonwebtoken";
import { splitByDelimiter, decodeBase64 } from '../../../lib/encrypt';

export const run: Handler = async (event: any, context: Context, callback: Callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

    // Provider에 따른 로그인 로직 처리 필요 (provider: browny, social )
    const admin = {
        id: "test",
        email: "email",
        password: "1234",
        access_token: "access_token",
        provider: "browny"
    };

    // Authorization: Basic BASE64("id:password")
    const [type, data] = splitByDelimiter(event.headers["Authorization"], " ");
    const [id, pw] = splitByDelimiter(decodeBase64(data), ":");
    // Accept only if all of type, id and password are expected value.
    const accepted = type === "Basic" && id === admin.id && pw === admin.password;
    if (!accepted) {
        return {
        statusCode: 401,
        body: "Unauthorized"
        };
    }
     // Generate a JWT to verify it at "auth" function easily.
    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "60m" });

    return {
        statusCode: 200,
        body: JSON.stringify({ token })
    };
};


