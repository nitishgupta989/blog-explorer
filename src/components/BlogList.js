import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';

function BlogList({ onBlogSelect, likedBlogs, onLike, searchTerm, filterAuthor }) {
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

  // Filter blogs based on search term and author filter
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = searchTerm === '' || 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      blog.body.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAuthor = filterAuthor === '' || blog.author === filterAuthor;
    
    return matchesSearch && matchesAuthor;
  });

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Latest Blog Posts</h1>
        <div className="badge bg-primary">
          {filteredBlogs.length} {filteredBlogs.length === 1 ? 'post' : 'posts'} found
        </div>
      </div>
      
      {filteredBlogs.length === 0 ? (
        <div className="alert alert-info">
          No blog posts match your search criteria. Try adjusting your filters.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredBlogs.map(blog => (
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
      )}
    </div>
  );
}

export default BlogList;
