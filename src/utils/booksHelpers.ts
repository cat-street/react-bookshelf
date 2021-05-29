const formatDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString(
    'en-US', { day: 'numeric', month: 'long', year: 'numeric' },
  );
};

export default formatDate;
