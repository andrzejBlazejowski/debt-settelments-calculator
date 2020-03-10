import React from "react";
import { Calendar } from "primereact/calendar";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";

function Provision(props: any) {
  return (
    <Panel
      style={props.panelStyle}
      className="p-col-9"
      header="judge provisions"
    >
      <div className="p-grid">
        <div className="content-section p-col-3">
          <h3>Date of interest start</h3>
          <Calendar
            value={props.startDate}
            onChange={e => {
              let { value } = e;
              if (Array.isArray(value)) {
                value = value[0];
              }
              console.log(value);
            }}
            showIcon={true}
            monthNavigator={true}
            yearNavigator={true}
            yearRange="2000:2030"
          />
        </div>
        <div className="content-section p-col-3">
          <h3>calculate to date</h3>
          <Calendar
            value={props.endDate}
            onChange={e => {
              let { value } = e;
              if (Array.isArray(value)) {
                value = value[0];
              }
              console.log(value);
            }}
            showIcon={true}
            showButtonBar={true}
          />
        </div>
        <div className="p-col-6 p-grid">
          <div className="p-col-6">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">$</span>
              <InputText keyfilter="num" placeholder="Operational Costs" />
            </div>
          </div>
          <div className="p-col-6">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">$</span>
              <InputText keyfilter="num" placeholder="initial debt " />
            </div>
          </div>
          <div className="p-col-6">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">%</span>
              <InputText keyfilter="num" placeholder="interest" />
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default Provision;
