export const formatLargeNumber = (number: number) => {
    let numberAbs = Math.abs(number);
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    let suffixIndex = 0;
  
    while (numberAbs >= 1000 && suffixIndex < suffixes.length - 1) {
      numberAbs /= 1000;
      suffixIndex++;
    }
  
    const formattedNumber = numberAbs.toFixed(1).replace(/\.0$/, '');
    const suffix = suffixes[suffixIndex];
  
    return (number < 0 ? '-' : '') + formattedNumber + suffix;
  };