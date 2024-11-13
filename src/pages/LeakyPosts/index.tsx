import { Post } from '~/components/Post';
import { usePostsContext } from '~/contexts/posts.context';



export function LeakyPosts() {
	const posts = usePostsContext()

	return (<>
		<h1>Fragment induced memory leak</h1>
		<section>
			{posts?.map(post => <Post
				title={post?.title ?? 'NO TITLE'}
				description={post?.body ?? 'NO DESCRIPTION'}
				href={`https://jsonplaceholder.typicode.com/posts/${post?.id}`}
			/>)}
		</section>
	</>);
}
