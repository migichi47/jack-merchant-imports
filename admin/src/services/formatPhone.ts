export const formatPhoneNumber = (phone: string) => {
  phone = phone?.trim();

  if (phone?.startsWith("+254")) {
    return phone;
  }

  if (phone?.startsWith("0")) {
    return phone?.replace(/^0/, "+254");
  }

  return `+254${phone}`;
};