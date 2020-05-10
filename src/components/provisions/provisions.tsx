import React, { CSSProperties } from "react";
import { Calendar } from "primereact/calendar";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { IProvision } from "../../store/interfaces";

interface Props {
  provisions: IProvision[];
  newProvision: IProvision;
  panelStyle: CSSProperties;
  onChange: (provision: IProvision) => void;
  removeProvision: (id: string) => void;
  addProvision: (provision: IProvision) => void;
}

enum ProvisionName {
  startDate = "startDate",
  endDate = "endDate",
  debt = "debt",
  interests = "interests",
  operationalCosts = "operationalCosts"
}

type OnChange = (name: ProvisionName, target: HTMLInputElement | Date) => void;

const Provision: React.FC<Props> = props => {
  function provisionControlsTemplate(rowData: IProvision) {
    console.log(rowData.id);
    return (
      <div className="p-grid">
        <div className="p-col-6">
          <Button
            onClick={e => {
              const id = typeof rowData.id === "string" ? rowData.id : "";
              props.removeProvision(id);
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

  props.provisions.map(provision => {
    if (provision.startDate instanceof Date) {
      provision.startDateString = provision.startDate.toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      });
    }
    return provision;
  });

  const onChange: OnChange = (name, target) => {
    let provision: IProvision = {};
    let date: Date;
    let minutesSeconds: number = 59;
    let hours: number = 23;
    switch (name) {
      case ProvisionName.endDate: {
        minutesSeconds = 0;
        hours = 0;
      }
      case ProvisionName.startDate: {
        date = target instanceof Date ? target : new Date();
        date.setSeconds(minutesSeconds);
        date.setMinutes(minutesSeconds);
        date.setHours(hours);
        provision[name] = date;
        break;
      }
      case ProvisionName.debt:
      case ProvisionName.interests:
      case ProvisionName.operationalCosts: {
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
          provision[name] = value;
        }
        break;
      }
    }
    props.onChange(provision);
  };

  return (
    <Panel
      style={props.panelStyle}
      className="p-col-9"
      header="judge provisions"
    >
      <div className="p-grid">
        <div className="content-section p-col-12 p-md-6 p-lg-3">
          <h5>Date of interest start</h5>
          <Calendar
            touchUI={true}
            value={props.newProvision.startDate}
            onChange={e => {
              onChange(ProvisionName.startDate, e.value as Date);
            }}
            showIcon={true}
            monthNavigator={true}
            yearNavigator={true}
            yearRange="2000:2030"
          />
        </div>
        <div className="content-section p-col-12 p-md-6 p-lg-3">
          <h5>calculate to date</h5>
          <Calendar
            touchUI={true}
            value={props.newProvision.endDate}
            onChange={e => {
              onChange(ProvisionName.endDate, e.value as Date);
            }}
            showIcon={true}
            showButtonBar={true}
          />
        </div>
        <div className="p-col-12 p-lg-6 p-grid">
          <div className="p-col-12 p-md-6">
            <h5>Operational Costs</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">$</span>
              <InputText
                value={props.newProvision.operationalCosts}
                placeholder="Operational Costs"
                onChange={e => {
                  onChange(
                    ProvisionName.operationalCosts,
                    e.target as HTMLInputElement
                  );
                }}
              />
            </div>
          </div>
          <div className="p-col-12 p-md-6">
            <h5>initial debt</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">$</span>
              <InputText
                value={props.newProvision.debt}
                placeholder="initial debt "
                onChange={e => {
                  onChange(ProvisionName.debt, e.target as HTMLInputElement);
                }}
              />
            </div>
          </div>
          <div className="p-col-12 p-md-6">
            <h5>interests</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">%</span>
              <InputText
                value={props.newProvision.interests}
                placeholder="interest"
                onChange={e => {
                  onChange(
                    ProvisionName.interests,
                    e.target as HTMLInputElement
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="p-col-1">
          <Button
            icon="pi pi-plus"
            onClick={() => {
              props.addProvision(props.newProvision);
            }}
          />
        </div>
        <div className="content-section p-col-12 p-md-12 p-lg-12">
          <DataTable value={props.provisions}>
            <Column field="startDateString" header="date" />
            <Column field="operationalCosts" header="operational costs" />
            <Column field="debt" header="debt" />
            <Column field="interests" header="interests" />
            <Column body={provisionControlsTemplate} />
          </DataTable>
        </div>
      </div>
    </Panel>
  );
};

export default Provision;
