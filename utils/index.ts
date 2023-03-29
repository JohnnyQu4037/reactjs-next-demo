import dayjs, { Dayjs, ManipulateType } from "dayjs";

export const sortString = (a: string, b: string): number => {
  const strA = a.toUpperCase();
  const strB = b.toUpperCase();
  if (strA < strB) {
    return 1;
  }
  if (strA > strB) {
    return -1;
  }

  return 0;
};

export const sortDate = (a: string, b: string): number => {
  const dateA = new Date(a).getTime();
  const dateB = new Date(b).getTime();
  if (dateA < dateB) {
    return 1;
  }
  if (dateA > dateB) {
    return -1;
  }

  return 0;
};

export const formatDayjsToString = (daytime: string | Dayjs) => {
  return dayjs(daytime).format("YYYY-MM-DD");
};

export const dayjsNow = () => {
  return dayjs();
};

export const dayjsAgo = (amount: number, unit: ManipulateType | undefined) => {
  return dayjs().subtract(amount, unit);
};

export const yAxisFormatterNumber = (value: any) => {
  let data = value;
  if (Math.abs(value) >= 1000000) {
    data = (value / 1000000).toFixed(1) + "M";
    return data;
  } else if (Math.abs(value) >= 1000) {
    data = (value / 1000).toFixed(1) + "K";
    return data;
  } else if (Math.abs(value) < 1000) {
    data = value;
    return data;
  }
  return value.toString();
};
