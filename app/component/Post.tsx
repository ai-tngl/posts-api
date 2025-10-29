type PostProps = {
  post: {
    id: number;
    title: string;
    body: string;
  };
};

export default function Post({ post }: PostProps) {
  return (
    <div className="border p-4 mb-3 rounded hover:shadow-sm transition">
      <h2 className="text-orange-600 font-semibold">{post.title}</h2>
      <p className="text-gray-700 text-sm">{post.body}</p>
    </div>
  );
}
