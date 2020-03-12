import {
  ADD_PAYMENT,
  REMOVE_PAYMENT,
  EDIT_PAYMENT,
  TOGGLE_DETAILS,
  EDIT_PROVISIONS_DATA,
  EDIT_NEW_PAYMENT
} from "./actions";
import { IPayment, IProvision, IAppState } from "./interfaces";

const initialState: IAppState = {
  payments: [
    {
      id: "asdasd2134gdfg",
      date: new Date(),
      amount: 12.34
    },
    {
      id: "asd34tnvfxfgd89",
      date: new Date(),
      amount: 12.34
    }
  ],
  newPayment: {
    id: "",
    date: new Date(),
    amount: 0
  },
  provisionData: {
    startDate: new Date(),
    endDate: new Date(),
    debt: 100,
    interests: 2,
    operationalCosts: 20
  },
  controlData: {
    showDetails: true
  }
};

const getUniquePaymentId = (payments: IPayment[]): string => {
  let result = "";
  let idUnique = true;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 25; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  payments.forEach(payment => {
    if (payment.id === result) idUnique = false;
  });
  if (idUnique) {
    return result;
  } else {
    return getUniquePaymentId(payments);
  }
};

function debtSettlements(
  state: IAppState = initialState,
  action: {
    type: string;
    id?: string;
    payment?: IPayment;
    provision: IProvision;
  }
): IAppState {
  switch (action.type) {
    case ADD_PAYMENT: {
      let nextPayment: IPayment = { id: "" };
      const id = getUniquePaymentId(state.payments);
      if (typeof action.payment !== "undefined") {
        nextPayment = action.payment;
      }
      nextPayment.id = id;
      return {
        payments: [...state.payments, nextPayment],
        provisionData: { ...state.provisionData },
        controlData: { ...state.controlData },
        newPayment: {
          date: new Date(),
          amount: 0
        }
      };
    }
    case REMOVE_PAYMENT: {
      return {
        payments: [
          ...state.payments.filter(payment => payment.id !== action.id)
        ],
        provisionData: { ...state.provisionData },
        controlData: { ...state.controlData },
        newPayment: { ...state.newPayment }
      };
    }
    case EDIT_PAYMENT: {
      let nextPayment: IPayment = { id: "" };
      if (typeof action.payment !== "undefined") {
        nextPayment = action.payment;
      }
      return {
        payments: [
          ...state.payments.filter(payment =>
            payment.id !== nextPayment.id
              ? payment
              : { ...payment, ...nextPayment }
          )
        ],
        provisionData: { ...state.provisionData },
        controlData: { ...state.controlData },
        newPayment: { ...state.newPayment }
      };
    }
    case EDIT_NEW_PAYMENT: {
      let nextPayment: IPayment = { id: "" };
      if (typeof action.payment !== "undefined") {
        nextPayment = action.payment;
      }
      return {
        payments: [...state.payments],
        provisionData: { ...state.provisionData },
        controlData: { ...state.controlData },
        newPayment: { ...state.newPayment, ...nextPayment }
      };
    }
    case TOGGLE_DETAILS: {
      return {
        payments: [...state.payments],
        provisionData: { ...state.provisionData },
        controlData: {
          ...state.controlData,
          showDetails: !state.controlData.showDetails
        },
        newPayment: { ...state.newPayment }
      };
    }
    case EDIT_PROVISIONS_DATA: {
      return {
        payments: [...state.payments],
        provisionData: { ...state.provisionData, ...action.provision },
        controlData: { ...state.controlData },
        newPayment: { ...state.newPayment }
      };
    }
  }
  return state;
}

export default debtSettlements;
