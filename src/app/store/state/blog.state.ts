import { Article } from '../../interfaces/blog/article.interface';
import { GetArticlesRes } from '../../interfaces/blog/get-articles-res.interface';
import { Pagination } from '../../interfaces/blog/pagination.interface';

export interface IBlogState {
  articles: Article[],
  getArticlesRes: GetArticlesRes,
  article: Article,
  pagination: Pagination
}

export const initialBlogState: IBlogState = {
  articles: [],
  pagination: {
    skipped: 0,
    totalCount: 0,
    limit: 4,
    hasNextPage: false
  },
  getArticlesRes: {
    skipped: 0,
    totalCount: 0,
    hasNextPage: false,
    success: false,
    articles: []
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
