import React from 'react';

function BlogCard({ blog, onBlogSelect, likes, onLike }) {
  const handleLike = (e) => {
    e.stopPropagation();
    onLike(blog.id);
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-capitalize">{blog.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">By {blog.author}</h6>
        <p className="card-text">{blog.body.substring(0, 100)}...</p>
        <div className="d-flex align-items-center mt-3">
          <button 
            className="btn btn-outline-danger btn-sm me-2"
            onClick={handleLike}
          >
            <i className="bi bi-heart-fill"></i> {likes}
          </button>
        </div>
      </div>
      <div className="card-footer bg-transparent border-top-0">
        <button 
          className="btn btn-primary" 
          onClick={() => onBlogSelect(blog)}
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default BlogCard;