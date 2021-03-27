import {
  FC, useEffect, useState, useMemo,
} from 'react';
import { Star, StarFill, StarHalf } from 'react-bootstrap-icons';

import './BookRating.css';

type Props = {
  rating: number;
  votes: number;
  ownVote: number;
  onUpdate: (vote: number) => void;
};

const BookRating: FC<Props> = ({
  rating, votes, ownVote, onUpdate,
}: Props) => {
  const [stars, setStars] = useState([0, 0, 0, 0, 0]);
  const [state, setState] = useState({
    rating: 0,
    votes: 0,
    previousVote: 0,
  });

  const setRating: Array<number> = useMemo(() => {
    const ratingArr = Array(5).fill(0);
    const ratingInt = Math.floor(state.rating);
    const remainder = state.rating - ratingInt;
    if (remainder >= 0.45 && remainder <= 0.95) ratingArr[ratingInt] = 1;
    else if (remainder > 0.95) ratingArr[ratingInt] = 2;
    ratingArr.fill(2, 0, ratingInt);
    return ratingArr;
  }, [state.rating]);

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

  const calculateRating = (vote: number) => {
    let newRating: number;
    let currentVotes = state.votes;
    if (state.previousVote) {
      newRating = ((state.rating * currentVotes - state.previousVote + vote)
        / currentVotes);
    } else {
      newRating = ((state.rating * currentVotes + vote)
        / (currentVotes + 1));
      currentVotes += 1;
    }
    setState((prevState) => ({
      ...prevState,
      rating: newRating,
      votes: currentVotes,
      previousVote: vote,
    }));
    onUpdate(vote);
  };

  useEffect(() => {
    setState({ rating, votes, previousVote: ownVote });
  }, [rating, votes, ownVote]);

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
                onClick={() => calculateRating(i + 1)}
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
                onClick={() => calculateRating(i + 1)}
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
                onClick={() => calculateRating(i + 1)}
                className="star"
              />
            );
        }
      })}
      {' '}
      <strong className="ml-2">{state.rating.toFixed(1)}</strong>
    </div>
  );
};

export default BookRating;
