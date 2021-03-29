import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { Comment } from '../../types/books';
import { formatDate } from '../../utils/booksHelpers';

type Props = {
  comment: Comment,
};

const CommentCard: FC<Props> = ({ comment }: Props) => (
  <Card bg="light" className="w-100 mb-2">
    <Card.Body>
      <Card.Title>
        {comment.ownerId}
        {' '}
        <small className="text-muted">{formatDate(comment.date)}</small>
      </Card.Title>
      <Card.Text>
        {comment.text}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default CommentCard;
