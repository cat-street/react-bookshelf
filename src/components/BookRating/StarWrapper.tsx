import { Icon } from 'react-bootstrap-icons';

type Props = {
  component: Icon;
  userId: string | null;
  score: number;
  onHover: (ind: number) => void;
  onOut: () => void;
  onClick: (score: number) => void;
};

const StarWrapper = ({
  component: Component,
  userId,
  score,
  onHover,
  onOut,
  onClick,
}: Props) => (
  <Component
    size={18}
    onMouseEnter={() => onHover(score)}
    onMouseLeave={onOut}
    onClick={() => onClick(score + 1)}
    className={userId ? 'star' : ''}
  />
);

export default StarWrapper;
