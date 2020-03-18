import React from "react";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function Provision(props: any) {
  return (
    <Panel
      style={props.panelStyle}
      className="p-col-9"
      header="summary details"
    >
      <div className="p-grid p-align-end vertical-container">
        <div className="p-col-12">
          <DataTable value={props.summary} responsive={true}>
            <Column field="date" header="date" />
            <Column field="debt" header="debt" />
            <Column field="costs" header="costs" />
            <Column field="interests" header="interests" />
            <Column field="payment" header="payment" />
          </DataTable>
        </div>
      </div>
    </Panel>
  );
}

export default Provision;
