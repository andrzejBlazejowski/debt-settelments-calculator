export interface IPayment {
  id?: string;
  date?: Date;
  amount?: string;
  dateString?: string;
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
  provisionData: IProvision;
  controlData: any;
}
