export interface IPayment {
  id?: string;
  date?: Date;
  amount?: number;
  dateString?: string;
}

export interface IProvision {
  startDate?: Date;
  endDate?: Date;
  debt?: number;
  interests?: number;
  operationalCosts?: number;
}

export interface IAppState {
  payments: IPayment[];
  newPayment: IPayment;
  provisionData: IProvision;
  controlData: any;
}
