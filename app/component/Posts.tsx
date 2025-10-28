type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Posts({ posts }: { posts: Post[] }) {
  if (!posts.length) return <p className="text-gray-500">No posts yet.</p>;

  return (
    <div className="max-w-2xl w-full px-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border p-4 mb-3 rounded hover:shadow-sm transition"
        >
          <h2 className="text-orange-600 font-semibold">{post.title}</h2>
          <p className="text-gray-700 text-sm">{post.body}</p>
        </div>
      ))}
    </div>
  );
}
