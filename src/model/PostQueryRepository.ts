import { createQueryBuilder, EntityRepository } from 'typeorm';
import Post from '../entity/Post';
import { PostSearchRequest } from '../page/dto/PostSearchRequest';

@EntityRepository(Post)
export class PostQueryRepository {
  paging(param: PostSearchRequest): Promise<[Post[], number]> {
    const queryBuilder = createQueryBuilder()
      .select(['post.id'])
      .from(Post, 'post')
      .limit(param.getLimit())
      .offset(param.getOffset());

    return queryBuilder.disableEscaping().getManyAndCount();
  }
}
