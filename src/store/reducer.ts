import {
  ADD_PAYMENT,
  REMOVE_PAYMENT,
  EDIT_PAYMENT,
  TOGGLE_DETAILS,
  EDIT_PROVISIONS_DATA,
  EDIT_NEW_PAYMENT
} from "./actions";
import { IPayment, IProvision, IAppState } from "./interfaces";
import { getUniquePaymentId } from "./../utils/idGenerator";

const initialState: IAppState = {
  payments: [
    {
      id: "asdasd345456",
      date: new Date("03/03/2020"),
      amount: "20"
    },
    {
      id: "ghjhjg67567",
      date: new Date("03/15/2020"),
      amount: "20"
    }
  ],
  debts: [],
  newPayment: {
    id: "",
    date: new Date(),
    amount: "0"
  },
  provisionData: {
    startDate: new Date("03/01/2019"),
    endDate: new Date("03/31/2020"),
    debt: "100",
    interests: "10",
    operationalCosts: "20"
  },
  controlData: {
    showDetails: false
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
        debts: [...state.debts],
        payments: [...state.payments, nextPayment],
        provisionData: { ...state.provisionData },
        controlData: { ...state.controlData },
        newPayment: {
          date: new Date(),
          amount: "0"
        }
      };
    }
    case REMOVE_PAYMENT: {
      return {
        debts: [...state.debts],
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
        debts: [...state.debts],
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
        debts: [...state.debts],
        payments: [...state.payments],
        provisionData: { ...state.provisionData },
        controlData: { ...state.controlData },
        newPayment: { ...state.newPayment, ...nextPayment }
      };
    }
    case TOGGLE_DETAILS: {
      return {
        debts: [...state.debts],
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
        debts: [...state.debts],
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
