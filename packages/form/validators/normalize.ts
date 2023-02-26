export const normalizePrice = (value?: string | number, prevValue?: string | number) => {
  const preparedValue = value?.toString().replace(',', '.');
  if (!preparedValue || preparedValue[preparedValue.length - 1] === '.') return preparedValue;

  return isNaN(parseFloat(preparedValue)) ? prevValue : parseFloat(preparedValue);
};
