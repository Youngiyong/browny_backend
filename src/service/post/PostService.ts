import { PostQueryRepository } from '../../model/PostQueryRepository';
import { PostSearchRequest } from '../../page/dto/PostSearchRequest';
import { Page } from '../../page/Page';
import { Service } from 'typedi';
import { PostSearchItem } from './dto/PostSearchItem';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class PostService {
  constructor(
    @InjectRepository() private postQueryRepository: PostQueryRepository
  ) {}

  async search(param: PostSearchRequest): Promise<Page<PostSearchItem>> {
    const [posts, count] = await this.postQueryRepository.paging(param);

    return new Page<PostSearchItem>(
      count,
      param.pageSize,
      posts.map((e) => new PostSearchItem(e))
    );
  }
}
