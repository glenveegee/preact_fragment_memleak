export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type Comment = {
  postId: Post['id'];
  id: number;
  name: string;
  email: string;
  body: string;
  postedAt?: Date;
}

export interface PostWithComments extends Post {
  comments: Comment[] | null;
};
