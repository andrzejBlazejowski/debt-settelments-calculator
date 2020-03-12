import React, { CSSProperties, SyntheticEvent } from "react";
import { Calendar } from "primereact/calendar";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { IPayment } from "../../store/interfaces";

interface Props {
  payments: IPayment[];
  newPayment: IPayment;
  panelStyle: CSSProperties;
  addPayment: (provision: IPayment) => void;
  onNewChange: (provision: IPayment) => void;
}

function paymentControlsTemplate() {
  return (
    <div className="p-grid">
      <div className="p-col-6">
        <Button icon="pi pi-trash" />
      </div>
      {/* <div className="p-col-6">
        <Button icon="pi pi-pencil" />
      </div> */}
    </div>
  );
}

const Payments: React.FC<Props> = props => {
  props.payments.map(payment => {
    if (payment.date instanceof Date) {
      payment.dateString = payment.date.toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      });
    }
    return payment;
  });

  return (
    <Panel
      style={props.panelStyle}
      className="p-col-9"
      header="debtor's payments"
    >
      <div className="p-grid p-align-end vertical-container">
        <div className="p-col-12">
          <DataTable value={props.payments}>
            <Column field="dateString" header="date of payment" />
            <Column field="amount" header="amount of payment" />
            <Column body={paymentControlsTemplate} />
          </DataTable>
        </div>
        <div className="p-col-3">
          <h3>Date of payment</h3>
          <Calendar
            value={props.newPayment.date}
            onChange={e => {
              let { value } = e;
              if (Array.isArray(value)) {
                value = value[0];
              }
              props.onNewChange({ date: value });
            }}
            showIcon={true}
            monthNavigator={true}
            yearNavigator={true}
            yearRange="2000:2030"
          />
        </div>
        <div className="p-col-3">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">$</span>
            <InputText
              keyfilter="num"
              placeholder="payment amount"
              value={props.newPayment.amount}
              onChange={(e: SyntheticEvent) => {
                let { value } = e.target as HTMLInputElement;
                props.onNewChange({ amount: parseFloat(value) });
              }}
            />
          </div>
        </div>
        <div className="p-col-1">
          <Button
            icon="pi pi-plus"
            onClick={() => {
              props.addPayment(props.newPayment);
            }}
          />
        </div>
      </div>
    </Panel>
  );
};

export default Payments;
