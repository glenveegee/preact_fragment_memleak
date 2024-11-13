import { Post } from "~/types/posts.types";

export async function getPosts(): Promise<Post[]> {
  return (await fetch('https://jsonplaceholder.typicode.com/posts')).json();
}

export async function getComments(postId: Post['id']): Promise<Comment[]> {
  return (await fetch(`https://jsonplaceholder.typicode.com//comments?postId=${postId}`)).json();
}

export async function getAllComments(): Promise<Comment[]> {
  return (await fetch(`https://jsonplaceholder.typicode.com//comments`)).json();
}
