import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';


import { PostsProvider } from './contexts/posts.context.js';
import { Posts } from './pages/Posts/index.js';
import { LeakyPosts } from '~/pages/LeakyPosts/index.js';

const NotFound = () => <div>404 NOT FOUND</div>

export function App() {
	return (
		<LocationProvider>
			<PostsProvider>
				<main>
					<Router>
						<Route path="/" component={Posts} />
						<Route path="/leaky" component={LeakyPosts} />

						<Route default component={NotFound} />
					</Router>
				</main>
			</PostsProvider>

		</LocationProvider>
	);
}

render(<App />, document.body);
