// eslint-disable-next-line import/prefer-default-export
export const calculateRating = (votesObj: Record<string, any>) =>
  Object.values<number>(votesObj).reduce((red, el) => red + el, 0);
