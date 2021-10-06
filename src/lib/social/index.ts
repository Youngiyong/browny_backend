
import { GoogleRedirectUrl } from "./google";
import { GithubRedirectUrl } from "./github"
export type SocialProvider = 'facebook' | 'github' | 'google';

export const socialRedirectLink = {
    google : GoogleRedirectUrl,
    github : GithubRedirectUrl
}


export function generateSocialLoginLink(provider: SocialProvider){
    for (let [key, value] of Object.entries(socialRedirectLink)) {
		if (key == provider) {
			return { "link": value } ;
	    }
    }
}