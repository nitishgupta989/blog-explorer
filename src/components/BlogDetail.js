import React, { useState, useEffect } from 'react';

function BlogDetail({ blog, onBackClick }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${blog.id}/comments`);
        const data = await response.json();
        setComments(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
        setLoading(false);
      }
    };

    fetchComments();
  }, [blog.id]);

  return (
    <div className="blog-detail">
      <button className="btn btn-outline-primary mb-4" onClick={onBackClick}>
        &larr; Back to Blogs
      </button>
      
      <div className="card mb-4 shadow">
        <div className="card-body">
          <h1 className="card-title text-capitalize mb-3">{blog.title}</h1>
          <h6 className="card-subtitle mb-3 text-muted">Written by {blog.author} ({blog.email})</h6>
          <p className="card-text">{blog.body}</p>
        </div>
      </div>
      
      <h4 className="mb-3">Comments</h4>
      
      {loading ? (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading comments...</span>
          </div>
        </div>
      ) : (
        <div className="comment-list">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div className="card mb-3" key={comment.id}>
                <div className="card-body">
                  <h5 className="card-title">{comment.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{comment.email}</h6>
                  <p className="card-text">{comment.body}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogDetail;