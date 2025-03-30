import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [likedBlogs, setLikedBlogs] = useState({});

  const handleBlogSelect = (blog) => {
    setSelectedBlog(blog);
  };

  const handleBackToList = () => {
    setSelectedBlog(null);
  };

  const handleLikeBlog = (blogId) => {
    setLikedBlogs(prev => ({
      ...prev,
      [blogId]: (prev[blogId] || 0) + 1
    }));
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container mt-4">
        {selectedBlog ? (
          <BlogDetail 
            blog={selectedBlog} 
            onBackClick={handleBackToList} 
            onLike={handleLikeBlog}
            likes={likedBlogs[selectedBlog.id] || 0}
          />
        ) : (
          <BlogList 
            onBlogSelect={handleBlogSelect} 
            likedBlogs={likedBlogs}
            onLike={handleLikeBlog}
          />
        )}
      </div>
    </div>
  );
}

export default App;