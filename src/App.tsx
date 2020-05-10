import React from "react";
import { connect } from "react-redux";
import Provisions from "./components/provisions/provisions";
import Payments from "./components/payments/payments";
import Summary from "./components/summary/summary";
import Details from "./components/details/details";
import {
  addPayment,
  // editPayment,
  removePayment,
  editNewPayment,
  removeProvision,
  addProvision,
  editProvisionData,
  toggleDetails
} from "./store/actions";
import { IProvision, IPayment } from "./store/interfaces";
import { debt } from "./utils/debtSettelments";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/luna-amber/theme.css";
import "./../node_modules/primeflex/primeflex.css";
import "./App.css";

function App(props: any) {
  const rootStyle = { width: "100%" };
  const panelStyle = { padding: "10px 0px" };
  let summary = [
    {
      date: new Date().toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      }),
      debt: 12.34,
      costs: 30,
      interests: 2.4,
      payment: 5
    },
    {
      date: new Date().toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      }),
      debt: 12.34,
      costs: 30,
      interests: 2.4,
      payment: 5
    }
  ];

  const summaryCalculator = new debt({
    startDate: props.newProvision.startDate,
    debt: props.newProvision.debt,
    interestsRate: props.newProvision.interests,
    operationalCosts: props.newProvision.operationalCosts,
    payments: props.payments
  });
  return (
    <div style={rootStyle} className="content-section p-grid p-justify-center">
      <Provisions
        provisions={props.provisions}
        newProvision={props.newProvision}
        onChange={props.editProvision}
        panelStyle={panelStyle}
        removeProvision={props.removeProvision}
        addProvision={props.addProvision}
      />

      <Payments
        payments={props.payments}
        newPayment={props.newPayment}
        panelStyle={panelStyle}
        addPayment={props.addPayment}
        onNewChange={props.editNewPayment}
        removePayment={props.removePayment}
      />

      <Summary
        panelStyle={panelStyle}
        toggleDetails={props.toggleDetails}
        data={summaryCalculator.getDebt4Date(props.newProvision.endDate)}
      />

      {props.controlData.showDetails && (
        <Details summary={summary} panelStyle={panelStyle} />
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch: (...args: any[]) => void) => ({
  toggleDetails: () => dispatch(toggleDetails()),
  editProvision: (provision: IProvision) =>
    dispatch(editProvisionData(provision)),
  addPayment: (payment: IPayment) => dispatch(addPayment(payment)),
  editNewPayment: (payment: IPayment) => dispatch(editNewPayment(payment)),
  removePayment: (id: string) => dispatch(removePayment(id)),
  addProvision: (provision: IProvision) => dispatch(addProvision(provision)),
  removeProvision: (id: string) => dispatch(removeProvision(id))
});

const mapStateToProps = (state: any) => ({
  ...state,
  payments: [...state.payments],
  provisions: [ ...state.provisions],
  newProvision: { ...state.newProvision},
  controlData: { ...state.controlData }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
