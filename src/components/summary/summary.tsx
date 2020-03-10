import React from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";

function Summary(props: any) {
  return (
    <Panel style={props.panelStyle} className="p-col-9" header="summary">
      <div className="p-grid p-align-center vertical-container">
        <div className="p-col-3">
          <h3>debt value: </h3>
          <h3>123$</h3>
        </div>
        <div className="p-col-3">
          <h3>debt date: </h3>
          <h3>30-10-2020</h3>
        </div>
        <div className="p-col-2">
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
