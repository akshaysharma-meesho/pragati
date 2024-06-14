export const chunkArr = <T>(arr: Array<T>, chunkSize: number) => {
  const chunked = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunked.push(arr.slice(i, i + chunkSize));
  }
  return chunked;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const options = {
    weekday: 'long' as const, // Full weekday name
    year: 'numeric',
    month: 'long', // Full month name
    day: 'numeric',
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return formattedDate;
};
