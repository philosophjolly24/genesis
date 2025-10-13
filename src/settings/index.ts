import { USER_CURRENCY_LOCALE, USER_CURRENCY_PREFERENCE } from "./config";

const formatCurrency = (amount: number) => {
  return Intl.NumberFormat(USER_CURRENCY_LOCALE, {
    style: "currency",
    currency: USER_CURRENCY_PREFERENCE, // type of currency formatting
  }).format(amount);
};

export { formatCurrency };
