import { Post } from '~/components/Post';
import { usePostsContext } from '~/contexts/posts.context';

export function Posts() {
	const posts = usePostsContext()

	return (<div>
		<h1>NO memory leak</h1>
		<section>
			{posts?.map(post => <Post
				title={post?.title ?? 'NO TITLE'}
				description={post?.body ?? 'NO DESCRIPTION'}
				href={`https://jsonplaceholder.typicode.com/posts/${post?.id}`}
			/>)}
		</section>
	</div>);
}
