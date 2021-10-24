import Database, { connectDatabase } from '../database';
import { getRepository } from 'typeorm';
import Post from '../entity/Post';
import { DeplResponse, DeplMsgResponse } from '../lib/response';

export const writePost = async (event: any) => {
  await connectDatabase();

  const payload = JSON.parse(event.body);
  console.log(payload);

  try {
    const postRepo = getRepository(Post);

    const post: Post = new Post();
    const result = await postRepo.save(post);
  } catch (e) {
    console.error(e);
  }
};

export const getPosts = async (event: any) => {
  const connection = new Database();
  await connection.getConnection();

  const payload = JSON.parse(event.body);
  console.log(payload);

  try {
    const postRepo = getRepository(Post);
    const posts = await postRepo.find({
      where: {
        user: payload.user_id,
      },
    });
    console.log(posts);

    if (!posts) return DeplMsgResponse(400, '포스트가 없습니다.');

    return DeplResponse(200, posts);
  } catch (e) {
    console.error(e);
  }
};
