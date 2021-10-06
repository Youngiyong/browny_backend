import { getConnection, getManager, getRepository } from 'typeorm';
import Database from '../database';
import { requestPostUser } from './type';
import { SocialProvider } from '../lib/social/index';
import User from '../entity/User';
import UserProfile from '../entity/UserProfile';
import SocialAccount from '../entity/SocialAccount';
import { generateAccessToken } from '../lib/encrypt';
import { setTokenCookie } from '../lib/token';

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

export async function createSocialAccount(params: { social_id: number | string; provider: SocialProvider; name: string}) {
    const connection = new Database();
    await connection.getConnection();

    const queryRunner = await getConnection().createQueryRunner()
    await queryRunner.startTransaction()
    try {
        const userRepository = getRepository(User);
        const user = new User();
        user.username = params.name
        await userRepository.save(user);

        const userProfileRepository = getRepository(UserProfile);
        const userprofile = new UserProfile();
        
        userprofile.fk_user_id = user.id
        userprofile.name = params.name
        await userProfileRepository.save(userprofile)
        
        const socialAccountRepository = getRepository(SocialAccount);
        const socialAccount = new SocialAccount();
        socialAccount.provider = params.provider
        socialAccount.social_id = params.social_id.toString();
        socialAccount.fk_user_id = user.id
        socialAccount.access_token = generateAccessToken(user.id);

        await socialAccountRepository.save(socialAccount);
        await queryRunner.commitTransaction();
        
        const tokens = await user.generateUserToken();
        const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*', // Required for CORS support to work
              'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
              'Set-Cookie': tokens
            },
            body: JSON.stringify({ socialAccount }),
        }
        return response

    } catch(err) {
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }

}

export async function getSocialAccount(params: { social_id: number | string; provider: SocialProvider, name: string }) {
    const connection = new Database();
    await connection.getConnection();
    const socialAccountRepo = getRepository(SocialAccount);
    const socialAccount = await socialAccountRepo.findOne({
      where: {
        social_id: params.social_id.toString(),
        provider: params.provider
      }
    });

    if(!socialAccount){
        return await createSocialAccount(params);
    } else {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
            where: {
                id: socialAccount.fk_user_id
            }
        })
        const tokens = await user.generateUserToken();

        const promise = Promise.resolve({
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
                'Set-Cookie': 'test.com'
            },
            'Set-Cookie': 'test.com',
            body: JSON.stringify({
              data: socialAccount,
            })
          });
        
        // const response = {
        //     statusCode: 200,
        //     headers: {
        //       'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        //       'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        //       'Set-Cookie': 'testcookie1=12345; domain=localhost:8000; expires=Thu, 19 Apr 2018 20:41:27 GMT;"'
        //     },
        //     body: JSON.stringify({ socialAccount }),
        // }
        // console.log(response)
        // console.log(promise)
        return promise
    }

 
}

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
  } finally {
    await queryRunner.release();
  }
}
