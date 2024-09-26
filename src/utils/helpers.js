import { parseISO, differenceInDays } from 'date-fns';
import slugify from 'slugify';
import moment from 'moment';
import 'moment/dist/locale/vi';
moment.locale('vi')

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

// export const formatCurrency = (value) =>
//   new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(
//     value
//   );

export const formatCurrency = (value) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

export const formatSlugify = (value) =>
  slugify(value, { lower: true, locale: 'vi' });

export const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

export const formatDateTime = (date) => {
  return moment(date).format("HH:mm, DD/MM/YYYY");
}

export const formatDateTimeFromNow = (date) => {
  return moment(date).fromNow();
}

export const toCamelCase = (str) => {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export const handleClickElement = (id) => {
  document.getElementById(id).click();
};

export const calculateRating = (reviews) => {
  if (!reviews.length) return 0;
  const totalRating = reviews.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);
  return (totalRating / reviews.length).toFixed(1);
}