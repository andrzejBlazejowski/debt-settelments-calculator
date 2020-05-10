import {
  ADD_PAYMENT,
  REMOVE_PAYMENT,
  EDIT_PAYMENT,
  TOGGLE_DETAILS,
  EDIT_PROVISIONS_DATA,
  EDIT_NEW_PAYMENT,
  ADD_PROVISION
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
  newProvision: {
    startDate: new Date("03/01/2019"),
    endDate: new Date("03/31/2020"),
    debt: "100",
    interests: "10",
    operationalCosts: "20"
  },
  provisions: [{
    startDate: new Date("03/01/2019"),
    endDate: new Date("03/31/2020"),
    debt: "100",
    interests: "10",
    operationalCosts: "20",
    id: "`sdascds454d123"
  },{
    startDate: new Date("03/01/2019"),
    endDate: new Date("03/31/2020"),
    debt: "100",
    interests: "10",
    operationalCosts: "20",
    id: "`sdasd123"
  },],
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
    provision?: IProvision;
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
        provisions: [ ...state.provisions ],
        newProvision: { ...state.newProvision },
        controlData: { ...state.controlData },
        newPayment: {
          date: new Date(),
          amount: "0"
        }
      };
    }
    case ADD_PROVISION: {
      let nextProvision: IProvision = { id: "" };
      const id = getUniquePaymentId(state.provisions);
      console.log(id);
      if (typeof action.provision !== "undefined") {
        nextProvision = action.provision;
      }
      nextProvision.id = id;
      return {
        debts: [...state.debts],
        payments: [...state.payments],
        provisions: [ ...state.provisions, nextProvision ],
        newProvision: { 
          startDate: new Date(),
          endDate: new Date(),
          operationalCosts: "20",
          debt: "100",
          interests: "10"
         },
        controlData: { ...state.controlData },
        newPayment: { ...state.newPayment }
      };
    }
    case REMOVE_PAYMENT: {
      return {
        debts: [...state.debts],
        payments: [
          ...state.payments.filter(payment => payment.id !== action.id)
        ],
        provisions: [ ...state.provisions ],
        newProvision: { ...state.newProvision },
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
        provisions: [ ...state.provisions ],
        newProvision: { ...state.newProvision },
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
        provisions: [ ...state.provisions ],
        newProvision: { ...state.newProvision },
        controlData: { ...state.controlData },
        newPayment: { ...state.newPayment, ...nextPayment }
      };
    }
    case TOGGLE_DETAILS: {
      return {
        debts: [...state.debts],
        payments: [...state.payments],
        provisions: [ ...state.provisions ],
        newProvision: { ...state.newProvision },
        controlData: {
          ...state.controlData,
          showDetails: !state.controlData.showDetails
        },
        newPayment: { ...state.newPayment }
      };
    }
    case EDIT_PROVISIONS_DATA: {
      console.log(action);
      return {
        debts: [...state.debts],
        payments: [...state.payments],
        provisions: [ ...state.provisions ],
        newProvision: { ...state.newProvision, ...action.provision },
        controlData: { ...state.controlData },
        newPayment: { ...state.newPayment }
      };
    }
  }
  return state;
}

export default debtSettlements;
