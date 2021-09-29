
import { getConnection, getManager, getRepository } from 'typeorm';
import Database from '../database';
import User from '../entity/User';
import { requestPostUser } from './interface';
import UserProfile from '../entity/UserProfile';

export async function findUserById(userId: string){
    const connection = new Database();
    await connection.getConnection();
    const user = await getRepository(User)
	.createQueryBuilder("user")
    .innerJoinAndSelect("user.profile", "profile")
	.where("user.id = :id", { id: userId })
	.getOne();
    return user
}

export async function createUser(payload: requestPostUser){

    const connection = new Database();
    await connection.getConnection();

    const queryRunner = await getConnection().createQueryRunner()
    await queryRunner.startTransaction()
    console.log(payload)
    try {
        const userRepository = getRepository(User);
        const user = new User();
        user.email = payload.body.email
        user.username = payload.body.username
        await userRepository.save(user);

        const userProfileRepository = getRepository(UserProfile);
        const userprofile = new UserProfile();
        
        userprofile.fk_user_id = user.id
        await userProfileRepository.save(userprofile)
        await queryRunner.commitTransaction();
        
        return user

    } catch(err) {
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }


}


    