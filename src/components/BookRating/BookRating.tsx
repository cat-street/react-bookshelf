import { useEffect, useState, useMemo } from 'react';
import { Star, StarFill, StarHalf } from 'react-bootstrap-icons';

import './BookRating.css';
import StarWrapper from './StarWrapper';

type Props = {
  userId: string | null;
  rating: number;
  votes: number;
  onUpdate: (vote: Record<string, number>) => void;
};

const BookRating = ({
  userId, rating, votes, onUpdate,
}: Props) => {
  const [stars, setStars] = useState([0, 0, 0, 0, 0]);

  const setStarRating: Array<number> = useMemo(() => {
    const ratingArr = Array(5).fill(0);
    const ratingInt = Math.floor(rating);
    const remainder = rating - ratingInt;
    if (remainder >= 0.45 && remainder <= 0.95) ratingArr[ratingInt] = 1;
    else if (remainder > 0.95) ratingArr[ratingInt] = 2;
    ratingArr.fill(2, 0, ratingInt);
    return ratingArr;
  }, [rating]);

  let timeOut: number;

  const onHover = (ind: number) => {
    if (!userId) return;
    clearTimeout(timeOut);
    const ratingArr = Array(5).fill(0);
    ratingArr.fill(2, 0, ind + 1);
    setStars(ratingArr);
  };

  const onOut = () => {
    timeOut = window.setTimeout(() => {
      setStars(setStarRating);
    }, 100);
  };

  const updateRating = (score: number) => {
    if (!userId) return;
    onUpdate({ [userId]: score });
  };

  useEffect(() => {
    setStars(setStarRating);
  }, [setStarRating]);

  return (
    <div className="d-flex align-items-center">
      {stars.map((el, i) => {
        let star;
        switch (el) {
          case 2:
            star = StarFill;
            break;
          case 1:
            star = StarHalf;
            break;
          default:
            star = Star;
        }
        return (
          <StarWrapper
            key={Math.random()}
            component={star}
            userId={userId}
            score={i}
            onHover={onHover}
            onOut={onOut}
            onClick={updateRating}
          />
        );
      })}
      <strong className="ml-2">{`${rating.toFixed(1)} (${votes})`}</strong>
    </div>
  );
};

export default BookRating;
