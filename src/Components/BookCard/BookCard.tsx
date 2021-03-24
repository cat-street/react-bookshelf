import { FC } from 'react';
import { Card, Col } from 'react-bootstrap';

const BookCard: FC = () => (
  <Col xs="12" sm="6" md="4" lg="3" xl="2" className="px-1 mb-3">
    <Card className="bookshelf__card">
      <Card.Img variant="top" src="/images/cover.jpg" className="w-75 mx-auto mt-3" />
      <Card.Body>
        <Card.Title className="text-uppercase">The King of Drugs</Card.Title>
        <Card.Subtitle className="text-muted mb-3">Nora Barrett</Card.Subtitle>
        <Card.Text>
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

export default BookCard;
