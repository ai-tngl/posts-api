import Post from './Post';

export type PostType = {
  id: number;
  title: string;
  body: string;
};

type PostsProps = {
  posts: PostType[];
};

export default function Posts({ posts }: PostsProps) {
  return (
    <div className='max-w-2xl w-full px-4'>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

