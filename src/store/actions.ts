export const ADD_PAYMENT = "ADD_PAYMENT";
export const REMOVE_PAYMENT = "REMOVE_PAYMENT";
export const EDIT_PAYMENT = "EDIT_PAYMENT";
export const TOGGLE_DETAILS = "TOGGLE_DETAILS";
export const EDIT_PROVISIONS_DATA = "EDIT_PROVISIONS_DATA";

export function addPayment(payment: any) {
  return {
    type: ADD_PAYMENT,
    payload: payment
  };
}

export function removePayment(paymentId: any) {
  return {
    type: REMOVE_PAYMENT,
    payload: paymentId
  };
}

export function editPayment(payment: any) {
  return {
    type: EDIT_PAYMENT,
    payload: payment
  };
}

export function toggleDetails() {
  return {
    type: TOGGLE_DETAILS
  };
}

export function editProvisionData(provision: any) {
  return {
    type: TOGGLE_DETAILS,
    payload: provision
  };
}
