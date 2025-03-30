import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleBlogSelect = (blog) => {
    setSelectedBlog(blog);
  };

  const handleBackToList = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container mt-4">
        {selectedBlog ? (
          <BlogDetail blog={selectedBlog} onBackClick={handleBackToList} />
        ) : (
          <BlogList onBlogSelect={handleBlogSelect} />
        )}
      </div>
    </div>
  );
}

export default App;
