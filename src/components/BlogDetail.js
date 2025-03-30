import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';

function BlogDetail({ blog, onBackClick, onLike, likes }) {
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

  const handleAddComment = (newComment) => {
    // In a real app, we would POST to the API
    // Since JSONPlaceholder doesn't actually save new data, we'll just add it to our local state
    const commentWithId = {
      ...newComment,
      id: comments.length + 1,
      postId: blog.id
    };
    setComments([commentWithId, ...comments]);
  };

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
          
          <div className="d-flex align-items-center mt-4">
            <button 
              className="btn btn-outline-danger me-2"
              onClick={() => onLike(blog.id)}
            >
              <i className="bi bi-heart-fill"></i> Like ({likes})
            </button>
          </div>
        </div>
      </div>
      
      <div className="comment-section mb-4">
        <h4 className="mb-3">Add a Comment</h4>
        <CommentForm onSubmitComment={handleAddComment} />
      </div>
      
      <h4 className="mb-3">Comments ({comments.length})</h4>
      
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
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogDetail;