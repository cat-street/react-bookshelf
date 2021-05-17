const compareFunc = (type: string, order = 'asc') =>
  (a: Record<string, any>, b: Record<string, any>) => {
    let first = a;
    let second = b;
    if (order === 'desc') [first, second] = [second, first];
    if (first[type] > second[type]) return 1;
    if (first[type] < second[type]) return -1;
    return 0;
  };

export default compareFunc;
