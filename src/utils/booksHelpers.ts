const calculateRating = (votesObj: Record<string, any>) => {
  if (!votesObj || Object.keys(votesObj).length === 0) return 0;
  return (
    Object.values<number>(votesObj).reduce((red, el) => red + el, 0)
      / Object.keys(votesObj).length
  );
};

const formatDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString(
    'en-US', { day: 'numeric', month: 'long', year: 'numeric' },
  );
};

export { calculateRating, formatDate };
