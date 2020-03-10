import React from "react";
import { connect } from "react-redux";
import Provision from "./components/provision/provision";
import Payments from "./components/payments/payments";
import Summary from "./components/summary/summary";
import Details from "./components/details/details";
import {
  addPayment,
  editPayment,
  editProvisionData,
  removePayment,
  toggleDetails
} from "./store/actions";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/luna-amber/theme.css";
import "./../node_modules/primeflex/primeflex.css";
import "./App.css";

// const props = {
//   payments: [
//     {
//       date: new Date().toLocaleDateString("pl-PL", {
//         day: "numeric",
//         month: "numeric",
//         year: "numeric"
//       }),
//       amount: 12.34
//     },
//     {
//       date: new Date().toLocaleDateString("pl-PL", {
//         day: "numeric",
//         month: "numeric",
//         year: "numeric"
//       }),
//       amount: 12.34
//     }
//   ],
//   provisionData: {
//     startDate: new Date(),
//     endDate: new Date(),
//     debt: 100,
//     interests: 2,
//     operationalCosts: 20
//   },
//   controlData: {
//     showDetails: true
//   }
// };

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

  return (
    <div style={rootStyle} className="content-section p-grid p-justify-center">
      <Provision
        startDate={props.provisionData.startDate}
        endDate={props.provisionData.endDate}
        debt={props.provisionData.debt}
        costs={props.provisionData.operationalCosts}
        interests={props.provisionData.interests}
        panelStyle={panelStyle}
      />

      <Payments
        payments={props.payments}
        date={new Date()}
        panelStyle={panelStyle}
      />

      <Summary panelStyle={panelStyle} toggleDetails={props.toggleDetails} />

      {props.controlData.showDetails && (
        <Details summary={summary} panelStyle={panelStyle} />
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch: (...args: any[]) => void) => ({
  toggleDetails: () => dispatch(toggleDetails())
});

const mapStateToProps = (state: any) => ({
  ...state,
  payments: [...state.payments],
  provisionData: { ...state.provisionData },
  controlData: { ...state.controlData }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
