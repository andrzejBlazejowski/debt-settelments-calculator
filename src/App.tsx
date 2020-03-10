import React from "react";
import Provision from "./components/provision/provision";
import Payments from "./components/payments/payments";
import Summary from "./components/summary/summary";
import Details from "./components/details/details";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/luna-amber/theme.css";
import "./../node_modules/primeflex/primeflex.css";
import "./App.css";

function App() {
  const rootStyle = { width: "100%" };
  const panelStyle = { padding: "10px 0px" };
  let payments = [
    {
      date: new Date().toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      }),
      amount: 12.34
    },
    {
      date: new Date().toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      }),
      amount: 12.34
    }
  ];
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
        startDate={new Date()}
        endDate={new Date()}
        panelStyle={panelStyle}
      />

      <Payments payments={payments} date={new Date()} panelStyle={panelStyle} />

      <Summary panelStyle={panelStyle} />

      <Details summary={summary} panelStyle={panelStyle} />
    </div>
  );
}

export default App;
