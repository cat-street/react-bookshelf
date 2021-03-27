// eslint-disable-next-line import/prefer-default-export
export const calculateRating = (votesObj: Record<string, any>) => {
  if (Object.keys(votesObj).length === 0) return 0;
  return (
    Object.values<number>(votesObj).reduce((red, el) => red + el, 0)
      / Object.keys(votesObj).length
  );
};
