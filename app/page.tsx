"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Posts, { PostType } from './component/Posts'
export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createPostResponse, setCreatePostResponse] = useState<PostType | null>(null);

  const getPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get<PostType[]>('https://jsonplaceholder.typicode.com/posts', {
        params: { _limit: 20 },
      });
      setPosts(res.data);
      setError("");
      console.log('Fetched posts:', res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    setLoading(true);
    try {
      const res = await axios.post<PostType>('https://jsonplaceholder.typicode.com/posts', {
        title: 'New Post',
        body: 'Example content',
        userId: 1,
      });
      setCreatePostResponse(res.data);
      setPosts((prev) => [res.data, ...prev]);
      console.log('Created post:', res.data);
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async () => {
    setLoading(true);
    try {
      const res = await axios.put<PostType>('https://jsonplaceholder.typicode.com/posts/1', {
        title: 'Updated Title',
        body: 'Updated content',
      });
      console.log('Updated post:', res.data);
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async () => {
    setLoading(true);
    try {
      const res = await axios.delete('https://jsonplaceholder.typicode.com/posts/1');
      console.log('Deleted post status:', res.status);
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center py-10'>
      <h1 className='text-3xl font-bold mb-6'>My Posts</h1>

      <div className='flex gap-3 mb-6'>
        <button onClick={createPost} className='bg-green-500 text-white px-4 py-2 rounded'>
          Create
        </button>
        <button onClick={updatePost} className='bg-yellow-500 text-white px-4 py-2 rounded'>
          Update
        </button>
        <button onClick={deletePost} className='bg-red-500 text-white px-4 py-2 rounded'>
          Delete
        </button>
      </div>

      {createPostResponse && (
        <div className='mb-4 p-2 border rounded bg-gray-100 w-1/2 text-center'>
          <p><strong>Created Post:</strong></p>
          <p>Title: {createPostResponse.title}</p>
          <p>Body: {createPostResponse.body}</p>
        </div>
      )}

      {loading && <p className='text-yellow-600'>Loading...</p>}
      {error && <p className='text-red-600'>{error}</p>}

      <Posts posts={posts} />
    </div>
  );
}
