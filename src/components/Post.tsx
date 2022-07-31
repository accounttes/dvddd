import React from 'react';
import './styles/Post.scss';

interface postProps {
  body: string;
  title: string;
  company: string;
  username: string;
  photo: string;
}

const Post: React.FC<postProps> = ({ body, title, company, username, photo }) => {
  return (
    <div className="post">
      <div className="post__user">
        <img className="post__photo" src={photo} alt="photo" />
        <div className="post__right">
          <div className="post__author">Author: {username}</div>
          <div className="post__company">Company: {company}</div>
        </div>
      </div>
      <div className="post__title">Title: {title}</div>
      <div className="post__body">{body}</div>
    </div>
  );
};

export default Post;
