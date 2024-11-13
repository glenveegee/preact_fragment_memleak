type PostProps = {
	title: string;
	href: string;
	description: string;
}

export function Post(props: PostProps) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}
