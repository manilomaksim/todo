export interface Article {
  _id: number;
  title: string;
  text: string;
  tags: string[];
  userInfo: {
    _id: string;
    email: string;
  }
}
