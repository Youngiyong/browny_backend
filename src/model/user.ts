import { getConnection, getRepository } from 'typeorm';
import Database from '../database';
import { requestPostUser } from './type';
import { SocialProvider } from '../lib/social';
import User from '../entity/User';
import UserProfile from '../entity/UserProfile';
import SocialAccount from '../entity/SocialAccount';
import { generateAccessToken, setTokenCookie } from '../lib/token';
import { APIGatewayProxyResponse } from "../model/type"

//수정 필요
export async function findUserById(userId: string) {
  const connection = new Database();
  await connection.getConnection();
  const user = await getRepository(User)
    .createQueryBuilder('user')
    .innerJoinAndSelect('user.profile', 'profile')
    .where('user.id = :id', { id: userId })
    .getOne();
  console.log(user);
  return user;
}

export async function createSocialAccount(params: {
  social_id: number | string;
  provider: SocialProvider;
  name: string;
}) {
  const connection = new Database();
  await connection.getConnection();

  const queryRunner = await getConnection().createQueryRunner();
  await queryRunner.startTransaction();
  try {
    const userRepository = getRepository(User);
    const user = new User();
    user.username = params.name;
    await userRepository.save(user);

    const userProfileRepository = getRepository(UserProfile);
    const userprofile = new UserProfile();

    userprofile.fk_user_id = user.id;
    userprofile.name = params.name;
    await userProfileRepository.save(userprofile);

    const socialAccountRepository = getRepository(SocialAccount);
    const socialAccount = new SocialAccount();
    socialAccount.provider = params.provider;
    socialAccount.social_id = params.social_id.toString();
    socialAccount.fk_user_id = user.id;
    socialAccount.access_token = generateAccessToken(user.id);

    await socialAccountRepository.save(socialAccount);
    await queryRunner.commitTransaction();


    const res = await getRepository(User)
                .createQueryBuilder('user')
                .innerJoinAndSelect('user.profile', 'profile')
                .where('user.id = :id', { id: user.id })
                .getOne();

    const tokens = await user.generateUserToken();
    const cookies = setTokenCookie(tokens)
    const response: APIGatewayProxyResponse = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        },
        multiValueHeaders: {
          'Set-Cookie': [ cookies.access_token, cookies.refresh_token ] 
        },
        body: JSON.stringify({
          data : {
            id: res.id,
            email: res.email,
            username: res.username,
            profile: {
                id: res.profile.id,
                name: res.profile.name,
                thumbnail: res.profile.thumbnail
            }
          }
        })
    }
    console.log(response)
    return response
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new Error("Invalid Error Message:"+ err)
  } finally {
    await queryRunner.release();
  }
}

export async function getSocialAccount(params: {
  social_id: number | string;
  provider: SocialProvider;
  name: string;
}) {
  const connection = new Database();
  await connection.getConnection();
  const socialAccountRepo = getRepository(SocialAccount);
  const socialAccount = await socialAccountRepo.findOne({
    where: {
      social_id: params.social_id.toString(),
      provider: params.provider,
    },
  });

  if (!socialAccount) {
    return await createSocialAccount(params);
  }

  const user = await getRepository(User)
                    .createQueryBuilder('user')
                    .innerJoinAndSelect('user.profile', 'profile')
                    .where('user.id = :id', { id: socialAccount.fk_user_id })
                    .getOne();

  if(!user){
    throw new Error("user_id is not exist User Table")
  }

  // TODO 여기서의 user 가 반드시 존재한다면, user!. 로 변경 요망! 이후 ts-ignore 제거
  // @ts-ignore
  const tokens = await user.generateUserToken();
  const cookies = setTokenCookie(tokens)
  console.log(cookies.access_token)
  const response: APIGatewayProxyResponse = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
      },
      multiValueHeaders: {
        'Set-Cookie': [ cookies.access_token, cookies.refresh_token ] 
      },
      body: JSON.stringify({ 
        data : {
          id: user.id,
          email: user.email,
          username: user.username,
          profile: {
              id: user.profile.id,
              name: user.profile.name,
              thumbnail: user.profile.thumbnail
          }
        }
      })
  }
  console.log(response)

  return response
}

//수정 필요
export async function createUser(payload: requestPostUser) {
  const connection = new Database();
  await connection.getConnection();

  const queryRunner = await getConnection().createQueryRunner();
  await queryRunner.startTransaction();
  try {
    const userRepository = getRepository(User);
    const user = new User();
    user.email = payload.body.email;
    user.username = payload.body.username;
    await userRepository.save(user);

    const userProfileRepository = getRepository(UserProfile);
    const userprofile = new UserProfile();

    userprofile.fk_user_id = user.id;
    await userProfileRepository.save(userprofile);
    await queryRunner.commitTransaction();

    return user;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new Error("Invalid Error Message:"+ err)
  } finally {
    await queryRunner.release();
  }
}

export const modifyProfileImage = async () => {
  const connection = new Database();
};
