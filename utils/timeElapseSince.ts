import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInYears,
  differenceInSeconds,
} from "date-fns";

const timeElapsedSince = (date: Date) => {
  const now = new Date();
  const pastDate = new Date(date);

  const seconds = differenceInSeconds(now, pastDate);
  if (seconds < 60)
    return `${seconds === 1 ? "1 secundă" : `${seconds} secunde`} `;

  const minutes = differenceInMinutes(now, pastDate);
  if (minutes < 60)
    return `${minutes === 1 ? "1 minut" : `${minutes} minute`} `;

  const hours = differenceInHours(now, pastDate);
  if (hours < 24) return `${hours === 1 ? "1 oră" : `${hours} ore`} `;

  const days = differenceInDays(now, pastDate);
  if (days < 7) return `${days === 1 ? "1 zi" : `${days} zile`} `;

  const weeks = differenceInWeeks(now, pastDate);
  if (weeks < 52)
    return `${weeks === 1 ? "1 săptămână" : `${weeks} saptămâni`} `;

  const years = differenceInYears(now, pastDate);
  if (years < 1) return `${years === 1 ? "1 an" : `${years} ani`} `;
};

export default timeElapsedSince;
