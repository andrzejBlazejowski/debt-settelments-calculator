import React from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";

function Summary(props: any) {
  return (
    <Panel style={props.panelStyle} className="p-col-9" header="summary">
      <div className="p-grid p-align-center vertical-container">
        <div className="p-col-12 p-md-6 p-lg-3 p-xl-2">
          <h3>debt value: </h3>
          <h3>{props.data.debt}$</h3>
        </div>
        <div className="p-col-12 p-md-6 p-lg-3 p-xl-2">
          <h3>operational costs: </h3>
          <h3>{props.data.operationalCosts}$</h3>
        </div>
        <div className="p-col-12 p-md-6 p-lg-3 p-xl-2">
          <h3>interests: </h3>
          <h3>{props.data.interests}$</h3>
        </div>
        <div className="p-col-12 p-md-6 p-lg-3 p-xl-2">
          <h3>debt date: </h3>
          <h3>{props.data.date.toLocaleDateString("en-EN")}</h3>
        </div>
        <div className="p-col-12 p-lg-12 p-xl-4">
          <Button
            label="show details"
            icon="pi pi-angle-double-down"
            onClick={props.toggleDetails}
          />
        </div>
      </div>
    </Panel>
  );
}

export default Summary;
