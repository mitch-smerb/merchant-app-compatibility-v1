export const getDigits = (value: string): string => value.replace(/\D+/g, '');

export const formatPhoneField = (v: string): string => {
  if (!v.length) return '';
  const value = getDigits(v);

  const area = value.slice(0, 3);
  const prefix = value.slice(3, 6);
  const line = value.slice(6, 10);

  const maskedArea = value.length > 3 ? `(${area}) ` : area;
  const maskedNumber = value.length > 6 ? `${prefix}-${line}` : prefix;

  return `${maskedArea}${maskedNumber}`;
};

const formatAmex = (value: string) => {
  const firstGroup = value.slice(0, 4);
  const secondGroup = value.slice(4, 10);
  const thirdGroup = value.slice(10, 15);

  const firstHalf = value.length > 4 ? `${firstGroup} ` : firstGroup;
  const secondHalf =
    value.length > 10 ? `${secondGroup} ${thirdGroup}` : secondGroup;

  return `${firstHalf}${secondHalf}`;
};

const formatCreditCard = (value: string) => {
  let counter = 0;
  let masked = '';

  while (counter < 16) {
    const segment = value.slice(counter, counter + 4);
    masked += segment.length === 4 ? `${segment} ` : segment;
    counter += 4;
  }

  return masked.trim();
};

export const formatCreditCardField = (v: string) => {
  if (!v.length) return '';
  const value = getDigits(v);

  if (value.startsWith('3')) return formatAmex(value);
  return formatCreditCard(value);
};

export const formatExpirationDate = (v: string) => {
  if (!v.length) return '';
  const value = getDigits(v);

  const month = value.slice(0, 2);
  const year = value.slice(2, 4);
  const join = value.length > 2 ? `${month} / ${year}` : month;

  return join;
};

export const formatZipcode = (v: string) => {
  if (!v.length) return '';
  const value = getDigits(v);

  const zip = value.slice(0, 5);
  const plusFour = value.slice(5, 9).length ? `-${value.slice(5, 9)}` : '';

  return `${zip}${plusFour}`;
};

export const formatNumber = (v: string) => {
  if (!v.length) return '';
  const value = getDigits(v);

  return value;
};

export const maskMapping: { [key: string]: (value: string) => string } = {
  phone: formatPhoneField,
  cardNumber: formatCreditCardField,
  monthYear: formatExpirationDate,
  zipCode: formatZipcode,
  cvv: formatNumber,
  routingNumber: formatNumber,
  bankAccountNumber: formatNumber
};

/** This defines how we want to get rid of the mask. */
export const stripMapping = {
  phone: getDigits,
  cardNumber: getDigits,
  monthYear: getDigits,
  zipCode: getDigits
};

export const mask = (
  { name, value }: { [key: string]: string },
  options: { [key: string]: string } = {}
): string => {
  // Use provided mapping if available
  const key = options[name] || name;

  return maskMapping[key] ? maskMapping[key](value) : value;
};
