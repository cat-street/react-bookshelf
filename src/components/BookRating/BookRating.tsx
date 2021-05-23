import {
  FC, useEffect, useState, useMemo,
} from 'react';
import { Star, StarFill, StarHalf } from 'react-bootstrap-icons';

import './BookRating.css';
import StarWrapper from './StarWrapper';

type Props = {
  userId: string | null;
  rating: number;
  votes: number;
  ownVote: number;
  onUpdate: (vote: Record<string, number>) => void;
};

const BookRating: FC<Props> = ({
  userId, rating, votes, ownVote, onUpdate,
}: Props) => {
  const [stars, setStars] = useState([0, 0, 0, 0, 0]);
  // const [state, setState] = useState({
  //   rating: 0,
  //   votes: 0,
  //   previousVote: 0,
  // });

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

  // const calculateRating = (vote: number) => {
  //   if (!userId) return;
  //   let newRating: number;
  //   let currentVotes = state.votes;
  //   if (state.previousVote) {
  //     newRating = ((state.rating * currentVotes - state.previousVote + vote)
  //       / currentVotes);
  //   } else {
  //     newRating = ((state.rating * currentVotes + vote)
  //       / (currentVotes + 1));
  //     currentVotes += 1;
  //   }
  //   setState((prevState) => ({
  //     ...prevState,
  //     rating: newRating,
  //     votes: currentVotes,
  //     previousVote: vote,
  //   }));
  //   onUpdate(vote, newRating);
  // };

  // useEffect(() => {
  //   setState({ rating, votes, previousVote: ownVote });
  // }, [rating, votes, ownVote]);

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
      <strong className="ml-2">{rating.toFixed(1)}</strong>
    </div>
  );
};

export default BookRating;
