export const pad = (n: number) => { return n < 10 ? '0' + n : n }

export const dateKoFormat = (date: Date) => {
  if (typeof date === 'string') date = new Date(date);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`
}

export const dateFormat = (date: Date) => {
  if (typeof date === 'string') date = new Date(date);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const timeFormat = (date: Date) => {
  if (typeof date === 'string') date = new Date(date);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

