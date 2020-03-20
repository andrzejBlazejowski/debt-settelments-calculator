export interface IPayment {
  id?: string;
  date?: Date;
  amount?: string;
  dateString?: string;
}

export interface IDebt {
  id?: string;
  startDate?: Date;
  endDate?: Date;
  amount?: string;
  operationalCosts?: string;
  interests?: string;
}

export interface IProvision {
  startDate?: Date;
  endDate?: Date;
  debt?: string;
  interests?: string;
  operationalCosts?: string;
}

export interface IAppState {
  payments: IPayment[];
  newPayment: IPayment;
  debts: IDebt[];
  provisionData: IProvision;
  controlData: any;
}
