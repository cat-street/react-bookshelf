import { SyntheticEvent, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

type Props = {
  onAdd: (comment: string) => void;
};

const CommentForm = ({ onAdd }: Props) => {
  const comment = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (comment?.current?.value) {
      onAdd(comment.current.value);
      comment.current.value = '';
    }
  };

  return (
    <Form className="w-100 d-flex flex-column" onSubmit={handleSubmit}>
      <Form.Control ref={comment} as="textarea" rows={3} className="mb-2" />
      <Button variant="info" type="submit" className="mx-auto px-5">
        Submit
      </Button>
    </Form>
  );
};

export default CommentForm;
