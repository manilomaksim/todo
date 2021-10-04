export interface Article {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  userInfo: {
    _id: string;
    email: string;
  }
}
