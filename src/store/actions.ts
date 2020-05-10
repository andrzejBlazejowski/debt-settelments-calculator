import { IPayment, IProvision } from "./interfaces";

export const ADD_PAYMENT = "ADD_PAYMENT";
export const REMOVE_PAYMENT = "REMOVE_PAYMENT";
export const EDIT_PAYMENT = "EDIT_PAYMENT";

export const EDIT_NEW_PAYMENT = "EDIT_NEW_PAYMENT";

export const TOGGLE_DETAILS = "TOGGLE_DETAILS";

export const ADD_PROVISION = "ADD_PROVISION";
export const REMOVE_PROVISION = "REMOVE_PROVISION";
export const EDIT_PROVISIONS_DATA = "EDIT_PROVISIONS_DATA";

export function addPayment(payment: IPayment) {
  return {
    type: ADD_PAYMENT,
    payment: payment
  };
}

export function addProvision(provision: IProvision) {
  return {
    type: ADD_PROVISION,
    provision: provision
  };
}

export function removePayment(paymentId: string) {
  return {
    type: REMOVE_PAYMENT,
    id: paymentId
  };
}

export function editPayment(payment: IPayment) {
  return {
    type: EDIT_PAYMENT,
    payment: payment
  };
}

export function editNewPayment(payment: IPayment) {
  return {
    type: EDIT_NEW_PAYMENT,
    payment: payment
  };
}

export function clearNewPayment() {
  return {
    type: EDIT_NEW_PAYMENT,
    payment: {
      id: "",
      date: new Date().toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      }),
      amount: 0
    }
  };
}

export function toggleDetails() {
  return {
    type: TOGGLE_DETAILS
  };
}


export function removeProvision(provisionId: string) {
  return {
    type: REMOVE_PROVISION,
    id: provisionId
  };
}

export function editProvisionData(provision: IProvision) {
  return {
    type: EDIT_PROVISIONS_DATA,
    provision: provision
  };
}
