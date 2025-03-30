import React, { useState } from 'react';

function CommentForm({ onSubmitComment }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!body.trim()) newErrors.body = 'Comment is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmitComment({ name, email, body });
      // Reset form
      setName('');
      setEmail('');
      setBody('');
      setErrors({});
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Comment</label>
            <textarea
              className={`form-control ${errors.body ? 'is-invalid' : ''}`}
              id="comment"
              rows="3"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Your comment"
            ></textarea>
            {errors.body && <div className="invalid-feedback">{errors.body}</div>}
          </div>
          
          <button type="submit" className="btn btn-primary">Submit Comment</button>
        </form>
      </div>
    </div>
  );
}

export default CommentForm;