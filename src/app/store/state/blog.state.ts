import { Article } from '../../interfaces/blog/article.interface';
import { Pagination } from '../../interfaces/blog/pagination.interface';

export interface IBlogState {
  articles: Article[],
  pagination: Pagination,
  article: Article
}

export const initialBlogState: IBlogState = {
  articles: [],
  pagination: {
    skip: 0,
    totalCount: 0,
    limit: 4,
    hasNextPage: false
  },
  article: {
    _id: '',
    title: '',
    text: '',
    tags: [],
    userInfo: {
      _id: '',
      email: ''
    }
  }
};
