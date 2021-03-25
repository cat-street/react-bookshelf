import {
  FC, useEffect, useState, useMemo,
} from 'react';
import { connect } from 'react-redux';
import { Star, StarFill, StarHalf } from 'react-bootstrap-icons';

import { updateRating } from '../../store/actions/index';
import './BookRating.css';

type Props = {
  rating: number;
  id: string;
  onUpdateRating: (id: string, rating: number) => void;
};

const BookRating: FC<Props> = ({ rating, id, onUpdateRating }: Props) => {
  const [stars, setStars] = useState([0, 0, 0, 0, 0]);

  const setRating: Array<number> = useMemo(() => {
    const ratingArr = Array(5).fill(0);
    const ratingInt = Math.floor(rating);
    const remainder = rating - ratingInt;
    if (remainder >= 0.5) ratingArr[ratingInt] = 1;
    ratingArr.fill(2, 0, ratingInt);
    return ratingArr;
  }, [rating]);

  let timeOut: number;

  const onHover = (ind: number) => {
    clearTimeout(timeOut);
    const ratingArr = Array(5).fill(0);
    ratingArr.fill(2, 0, ind + 1);
    setStars(ratingArr);
  };

  const onOut = () => {
    timeOut = window.setTimeout(() => {
      setStars(setRating);
    }, 100);
  };

  useEffect(() => {
    setStars(setRating);
  }, [setRating]);

  return (
    <div className="d-flex align-items-center">
      {stars.map((el, i) => {
        switch (el) {
          case 2:
            return (
              <StarFill
                size={18}
                key={Math.random()}
                onMouseEnter={() => onHover(i)}
                onMouseLeave={onOut}
                onClick={() => onUpdateRating(id, (i + 1))}
                className="star"
              />
            );
          case 1:
            return (
              <StarHalf
                size={18}
                key={Math.random()}
                onMouseEnter={() => onHover(i)}
                onMouseLeave={onOut}
                onClick={() => onUpdateRating(id, (i + 1))}
                className="star"
              />
            );
          default:
            return (
              <Star
                size={18}
                key={Math.random()}
                onMouseEnter={() => onHover(i)}
                onMouseLeave={onOut}
                onClick={() => onUpdateRating(id, (i + 1))}
                className="star"
              />
            );
        }
      })}
      {' '}
      <strong className="ml-2">{rating}</strong>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  onUpdateRating: (id: string, rating: number) => dispatch(updateRating(id, rating)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookRating);
