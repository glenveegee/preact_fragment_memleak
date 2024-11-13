import { getComments } from "~/services/api.service";
import { Post, PostWithComments } from "~/types/posts.types";

const commentCache = new Map<Post['id'] | '', Comment[]>();

export async function getCachedComments(
  postId: Post['id'] | '' = ''
): Promise<Comment[] | null> {
  if (!postId) {
    return null;
  }

  let commentResult = commentCache.get(postId);

  if (commentResult && commentResult.length > 0) {
    return commentResult
  }

  let newComments = await getComments(postId);

  newComments = newComments?.map(comment => ({
    ...comment,
    postedAt: new Date()
  }))

  commentCache.set(postId, newComments);

  return newComments;
}

export async function getCommentsForPost(post: Post): Promise<Comment[] | null> {
  const comments = post.id
    ? await getCachedComments(post.id)
    : null;

  return comments

}

export async function getPostsWithComments(
  post: Post[],
): Promise<PostWithComments[]> {
  return Promise.all(
    post.map(async post => {
      const comments = await getCommentsForPost(post);

      const mappedPost: PostWithComments = {
        ...post,
        comments,
      };

      return mappedPost;
    }),
  );
}
