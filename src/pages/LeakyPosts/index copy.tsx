

import { usePostsContext } from '~/contexts/posts.context';
import { PostWithComments } from '~/types/posts.types';

export function LeakyPosts() {
	const posts = usePostsContext()

	function renderPostCards(post?: PostWithComments) {
		return (<PostComponent
			title={post?.title ?? 'NO TITLE'}
			description={post?.body ?? 'NO DESCRIPTION'}
			href={`https://jsonplaceholder.typicode.com/posts/${post?.id}`}
		/>)
	}


	function renderPosts(postsIn?: PostWithComments[]) {
		if (!postsIn?.length) {
			renderPostCards()
		}
		return posts?.map(renderPostCards)
	}

	return (

		// // NO MEMORY LEAKAGE

		// // EXAMPLE 1
		// <>{renderPosts(posts)}</>

		// // EXAMPLE 2
		// <Fragment>{renderPosts(posts)}</Fragment>

		// -------------------------------- //

		// // NO MEMORY LEAKAGE

		// // EXAMPLE 1
		// <div class="posts">
		// 	<h1>Leaky posts demo</h1>
		// 	<section>
		// 		{renderPosts(posts)}
		// 	</section>
		// </div>

		// // EXAMPLE 2
		renderPosts(posts)

		// // EXAMPLE 3
		// <div>{renderPosts(posts)}</div>

		// // EXAMPLE 4
		// [<>{renderPosts(posts)}</>]
	);
}

type PostProps = {
	title: string;
	href: string;
	description: string;
}

function PostComponent(props: PostProps) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>*{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}
