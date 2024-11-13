import { ComponentChildren, createContext, JSX } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import { getPosts } from '~/services/api.service';
import type { PostWithComments } from '~/types/posts.types';
import { setPolling } from '~/utils/api.utils';
import { getPostsWithComments } from '~/utils/posts.utils';

const PostsContext = createContext<PostWithComments[] | undefined>(
  undefined,
);

export function PostsProvider({
  children,
}: { children: ComponentChildren }): JSX.Element {
  const [postsWithComments, setPostsWithComments] = useState<
    PostWithComments[] | undefined
  >();

  useEffect(() => {

    const cancelGetPostsPoll = setPolling(
      getPosts,
      async posts => {
        const mappedPosts = await getPostsWithComments(posts);
        setPostsWithComments(mappedPosts);
      },
    );

    return () => {
      cancelGetPostsPoll();
    };
  }, []);

  return (
    <PostsContext.Provider value={postsWithComments}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePostsContext(): PostWithComments[] | undefined {
  return useContext(PostsContext);
}
