import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
// import * as commentsApi from '../api/comments';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments,
  addCommentApi,
  deleteCommentApi,
} from '../features/commments/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);

  const { comments, loaded, error } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComments(post.id));
  }, [dispatch, post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = {
        name,
        email,
        body,
        postId: post.id,
      };

      await dispatch(addCommentApi(newComment));
    } catch (hasError) {
      window.console.log(hasError);
    }

    await dispatch(fetchComments(post.id));
  };

  const deleteComment = async (commentId: number) => {
    try {
      await dispatch(deleteCommentApi(commentId));
    } catch (hasError) {
      window.console.log(hasError);
    }

    await dispatch(fetchComments(post.id));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post.id}: ${post.title}`}
        </h2>

        <p data-cy="PostBody">
          {post.body}
        </p>
      </div>

      <div className="block">
        {loaded && (
          <Loader />
        )}

        {loaded && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loaded && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loaded && !error && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!loaded && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loaded && !error && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
