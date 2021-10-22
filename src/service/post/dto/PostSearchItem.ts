import Post from '../../../entity/Post';

export class PostSearchItem {
  title: string;
  body: string;

  constructor(entity: Post) {
    this.title = entity.title;
    this.body = entity.body;
  }
}
