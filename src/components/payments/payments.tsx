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
  removePayment: (id: string) => void;
  onNewChange: (provision: IPayment) => void;
}

const Payments: React.FC<Props> = props => {
  function paymentControlsTemplate(rowData: IPayment) {
    return (
      <div className="p-grid">
        <div className="p-col-6">
          <Button
            onClick={e => {
              const id = typeof rowData.id === "string" ? rowData.id : "";
              props.removePayment(id);
            }}
            icon="pi pi-trash"
          />
        </div>
        {/* <div className="p-col-6">
          <Button icon="pi pi-pencil" />
        </div> */}
      </div>
    );
  }

  type OnChange = (target: HTMLInputElement | Date) => void;
  const onChange: OnChange = target => {
    let value = target instanceof HTMLInputElement ? target.value : "0";
    const floatRegexp = new RegExp(
      "^[0-9]{1,10}([.,]){0,1}([0-9]{1,2}){0,1}$",
      "g"
    );
    if (value.length === 0) {
      value = "0";
    } else {
      while (value[0] === "0") {
        value = value.slice(1);
      }
    }
    if (floatRegexp.test(value)) {
      props.onNewChange({ amount: value });
    }
  };

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
        <div className="p-col-12 p-md-6 p-lg-3">
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
        <div className="p-col-12 p-md-6 p-lg-3">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">$</span>
            <InputText
              placeholder="payment amount"
              value={props.newPayment.amount}
              onChange={(e: SyntheticEvent) => {
                onChange(e.target as HTMLInputElement);
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
        {props.payments.length !== 0 && (
          <div className="p-col-12">
            <DataTable value={props.payments}>
              <Column field="dateString" header="date" />
              <Column field="amount" header="amount" />
              <Column body={paymentControlsTemplate} />
            </DataTable>
          </div>
        )}
      </div>
    </Panel>
  );
};

export default Payments;
