import { getConnection, getRepository } from 'typeorm';
import Database from '../database';
import User from '../entity/User'
import UserFollow from '../entity/UserFollow';
import { BrownyCreateResponse, BrownyMsgResponse } from '../lib/response';

export async function createUserFollow(event: any, user_id: string){
    const connection = new Database();
    await connection.getConnection();

    const payload = JSON.parse(event.body)
    console.log(payload, user_id)
    try {
        const userRepo = getRepository(User)
        const user = await userRepo.findOne({
            where: {
                id: user_id
            }
        })
        console.log(user)
    
        if(!user) {
            return BrownyMsgResponse(400, "존재하지 않는 사용자입니다.")         
        }

        const userFollowRepo = getRepository(UserFollow)
        const userFollow = await userFollowRepo.findOne({
            where: {
                fk_user_id: user_id,
                fk_follow_user_id: payload.follow_user_id
            }
        })
        console.log(userFollow)
        if(userFollow) return BrownyMsgResponse(400, "이미 팔로우한 사용자입니다.")

        const follow = new UserFollow()
        follow.fk_user_id = user_id
        follow.fk_follow_user_id = payload.follow_user_id

        await userFollowRepo.save(follow)
        return BrownyMsgResponse(200, "Success Follow User")
    } catch(e){
        console.error(e)
        throw new Error("Internal Server Error")
    }
}

export async function deleteUserFollow(event: any, user_id: string){
    const connection = new Database();
    await connection.getConnection();

    const payload = event.pathParameters
    console.log(event)
    try {
        const userRepo = getRepository(User)
        const user = await userRepo.findOne({
            where: {
                id: user_id
            }
        })
        if(!user) return BrownyMsgResponse(400, "존재하지 않는 사용자입니다.")         

        const userFollowRepo = getRepository(UserFollow)
        const userFollow = await userFollowRepo.findOne({
            where: {
                id: payload.user_id,
                fk_follow_user_id: user_id
            }
        })
        console.log(userFollow)
        if(userFollow) {
            userFollowRepo.remove(userFollow)
            return BrownyMsgResponse(200, "Delete Success")
        }
        else {
            return BrownyMsgResponse(400, "팔로우한 사용자가 존재하지 않습니다.")
        }

    } catch(e){
        console.error(e)
        throw new Error("Internal Server Error")
    }
}

export async function getUserFollowers(event: any){
    const connection = new Database();
    await connection.getConnection();

    const payload = event.pathParameters
    try {
        const userRepo = getRepository(User)
        const user = await userRepo.findOne({
            where: {
                id: payload.user_id
            }
        })
        if(!user) return BrownyMsgResponse(400, "존재하지 않는 사용자입니다.")         

        const userFollowRepo = getRepository(UserFollow)
        const userFollow = await userFollowRepo.find({
            where: {
                fk_follow_user_id: payload.user_id
            }
        })
        console.log(userFollow)
        return BrownyCreateResponse(200, userFollow)

    } catch(e){
        console.error(e)
        throw new Error("Internal Server Error")
    }
}

export async function getUserFollows(event: any){
    const connection = new Database();
    await connection.getConnection();

    const payload = event.pathParameters
    try {
        const userRepo = getRepository(User)
        const user = await userRepo.findOne({
            where: {
                id: payload.user_id
            }
        })
        if(!user) return BrownyMsgResponse(400, "존재하지 않는 사용자입니다.")         
        console.log(user)
        // const userFollow = getRepository(UserFollow).createQueryBuilder("user_follow")
        // .innerJoinAndSelect('user.follow', 'follow')
        // .where('user_follow.fk_user_id = :fk_user_id', { fk_user_id: payload.user_id} )
        // .getOne();
        const userFollowRepo = await getRepository(UserFollow)
        const userFollow = await userFollowRepo.find({
            where: {
                fk_user_id: payload.user_id
            }
        })
        console.log(userFollow)
        return BrownyCreateResponse(200, userFollow)

    } catch(e){
        console.error(e)
        throw new Error("Internal Server Error")
    }
}