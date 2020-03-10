import {
  ADD_PAYMENT,
  REMOVE_PAYMENT,
  EDIT_PAYMENT,
  TOGGLE_DETAILS,
  EDIT_PROVISIONS_DATA
} from "./actions";

interface IAppState {
  payments: any[];
  provisionData: any;
  controlData: any;
}

const initialState: IAppState = {
  payments: [
    {
      id: "asdasd2134gdfg",
      date: new Date().toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      }),
      amount: 12.34
    },
    {
      id: "asd34tnvfxfgd89",
      date: new Date().toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      }),
      amount: 12.34
    }
  ],
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

function debtSettlements(
  state: IAppState = initialState,
  action: any
): IAppState {
  switch (action.type) {
    case ADD_PAYMENT: {
      return {
        payments: [...state.payments, action.payload],
        provisionData: { ...state.provisionData },
        controlData: { ...state.controlData }
      };
    }
    case REMOVE_PAYMENT: {
      return {
        payments: [
          ...state.payments.filter(payment => payment.id !== action.payload)
        ],
        provisionData: { ...state.provisionData },
        controlData: { ...state.controlData }
      };
    }
    case EDIT_PAYMENT: {
      return {
        payments: [
          ...state.payments.filter(payment =>
            payment.id !== action.payload.id ? payment : action.payload
          )
        ],
        provisionData: { ...state.provisionData },
        controlData: { ...state.controlData }
      };
    }
    case TOGGLE_DETAILS: {
      return {
        payments: [...state.payments],
        provisionData: { ...state.provisionData },
        controlData: {
          ...state.controlData,
          showDetails: !state.controlData.showDetails
        }
      };
    }
    case EDIT_PROVISIONS_DATA: {
      return {
        payments: [...state.payments, action.payload],
        provisionData: { ...state.provisionData, ...action.payload },
        controlData: { ...state.controlData }
      };
    }
  }
  return state;
}

export default debtSettlements;
