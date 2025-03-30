import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';

function BlogList({ onBlogSelect, likedBlogs, onLike }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const data = await response.json();
        
        // Get user information for each blog
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await usersResponse.json();
        
        // Combine posts with user information
        const blogsWithUserInfo = data.map(post => {
          const user = users.find(user => user.id === post.userId);
          return {
            ...post,
            author: user ? user.name : 'Unknown Author',
            email: user ? user.email : 'unknown@example.com'
          };
        });
        
        setBlogs(blogsWithUserInfo);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4">Latest Blog Posts</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {blogs.map(blog => (
          <div className="col" key={blog.id}>
            <BlogCard 
              blog={blog} 
              onBlogSelect={onBlogSelect} 
              likes={likedBlogs[blog.id] || 0}
              onLike={onLike}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;