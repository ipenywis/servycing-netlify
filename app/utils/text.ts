export function calculateAverageReadTime(text: string): number {
  const wordsPerMinute = 200; ///< Words per minute
  let average: number = 1;

  const textWords = text ? text.trim().split(' ').length : null;
  if (textWords && textWords > 0)
    average = Math.ceil(textWords / wordsPerMinute);

  return average;
}
