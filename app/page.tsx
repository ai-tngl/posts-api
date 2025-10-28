"use client";

import { useState, useEffect } from "react";
import Posts from "./component/Posts";
import axios from "axios";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createPostResponse, setCreatePostResponse] = useState<Post | null>(null);

  const handleGet = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts", {
        params: { _limit: 20 },
      });
      console.log("Fetched posts:", res.data);
      setPosts(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: "New Post",
        body: "Example content",
        userId: 1,
      });
      console.log("Created post:", res.data);
      setCreatePostResponse(res.data);

      setPosts((prev) => [res.data, ...prev]);

    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handlePut = async () => {
    setLoading(true);
    try {
      const res = await axios.put("https://jsonplaceholder.typicode.com/posts/1", {
        title: "Updated Title",
        body: "Updated content",
      });
      console.log("Updated post:", res.data);
    } catch (err) {
      console.error("Error updating post:", err);
      setError("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete("https://jsonplaceholder.typicode.com/posts/1");
      console.log("Deleted post status:", res.status);
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">My Posts</h1>

      <div className="flex gap-3 mb-6">
        <button onClick={handleCreatePost} className="bg-green-500 text-white px-4 py-2 rounded">
          Create
        </button>
        <button onClick={handlePut} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Update
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>

      {createPostResponse && (
        <div className="mb-4 p-2 border rounded bg-gray-100 w-1/2 text-center">
          <p><strong>Created Post:</strong></p>
          <p>Title: {createPostResponse.title}</p>
          <p>Body: {createPostResponse.body}</p>
        </div>
      )}

      {loading && <p className="text-yellow-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <Posts posts={posts} />
    </div>
  );
}
