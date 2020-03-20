import { IPayment, IDebt } from "../store/interfaces";

export const getUniquePaymentId = (data: IPayment[]): string => {
  return getUniqueId(
    data.map(row => {
      return typeof row.id === "string" ? row.id : "";
    })
  );
};

export const getUniqueDebtId = (data: IDebt[]): string => {
  return getUniqueId(
    data.map(row => {
      return typeof row.id === "string" ? row.id : "";
    })
  );
};

export const getUniqueId = (data: string[]): string => {
  let result = getId();
  let idUnique = true;

  data.forEach(row => {
    if (row === result) idUnique = false;
  });
  if (idUnique) {
    return result;
  } else {
    return getUniqueId(data);
  }
};

export const getId = (): string => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 25; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
