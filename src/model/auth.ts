import { getGoogleAccessToken, getGoogleProfile} from "../lib/social/google"
import { getSocialAccount } from "../model/user"
import { SocialProvider, socialRedirectLink } from "../lib/social";
import { getGithubAccessToken, getGithubProfile } from "../lib/social/github";


export async function githubLoginEvent(event: any) {
    //로그인 성공한 토큰 코드를 얻어온다
    const code = event.query.code;
    if (!code) {
      return;
    }
    
    try {
    //깃허브 엑세스 토큰을 얻어온다.
        const accessToken = await getGithubAccessToken({
                code,
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET
        });
        console.log("accessToken",accessToken)
        const profile = await getGithubProfile(accessToken);
        console.log("profile", profile)
        const socialAccount = await getSocialAccount({
                social_id: profile.id,
                provider: 'github',
                name: profile.login
        });
        return socialAccount
        
        } catch (e) {
            console.log(e);
        }
}

export async function googleLoginEvent(event: any) {

    //로그인 성공한 토큰 코드를 얻어온다
    const code = event.query.code;
    if (!code) {
      return;
    }

    try {
      //구글 엑세스 토큰을 얻어온다.
      const accessToken = await getGoogleAccessToken({
          code,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          redirectUri: process.env.GOOGLE_REDIRECT_PATH,
      });

      //엑세스 토큰을 가지고 프로필 정보를 얻어온다.
      const profile = await getGoogleProfile(accessToken);

      //기존 가입된 소셜정보가 있는지 확인한다. return user_id, jwt access token, refresh token return
      const socialAccount = await getSocialAccount({
            social_id: profile.names[0].metadata.source.id,
            provider: 'google',
            profile: profile
      });
 

      return socialAccount

    } catch (e) {
      console.log(e);
    }
};

export async function callbackAuthEvent(event: any, provider: SocialProvider) {
    switch(provider){
        case "google":
            return await googleLoginEvent(event);
        case "github":
            return await githubLoginEvent(event);
    }
}
