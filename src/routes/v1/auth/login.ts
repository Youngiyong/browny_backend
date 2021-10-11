import { Context, Callback, Handler } from 'aws-lambda';
import { joinMemberShip, loginBrowny } from '../../../model/user'


/**
 *  이메일 중복 여부 및 패스워드 검사
 */
export const joinUser: Handler = async (event: any, context: Context, callback: Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return await joinMemberShip(event)
};

/**
 *  회원가입시 이메일 인증
 */
export const sendEmailAuth: Handler = async (event: any, context: Context, callback: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const user_id = event.path.user_id;
    const body = event.body
};


/**
 *  비밀번호 변경시 이메일 인증
 */
export const sendEmailAuthByChangePassword: Handler = async (event: any, context: Context, callback: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const user_id = event.path.user_id;
    const body = event.body
};


/**
 *  로그인
 */
export const loginByEmailAndPassword: Handler = async (event: any, context: Context, callback: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await loginBrowny(event)
};


/**
 *  로그아웃
 */
export const logout: Handler = async (event: any, context: Context, callback: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const user_id = event.path.user_id;
    const body = event.body
};



export const run: Handler = async (event: any, context: Context, callback: Callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

    // Provider에 따른 로그인 로직 처리 필요 (provider: browny, social )
 
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


