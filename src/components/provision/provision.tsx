import React, { CSSProperties } from "react";
import { Calendar } from "primereact/calendar";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { IProvision } from "../../store/interfaces";

interface Props {
  startDate: Date;
  endDate: Date;
  debt: string;
  costs: string;
  interests: string;
  panelStyle: CSSProperties;
  onChange: (provision: IProvision) => void;
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
  const onChange: OnChange = (name, target) => {
    let provision: IProvision = {};
    switch (name) {
      case ProvisionName.endDate:
      case ProvisionName.startDate: {
        provision[name] = target instanceof Date ? target : new Date();
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
        <div className="content-section p-col-3">
          <h5>Date of interest start</h5>
          <Calendar
            value={props.startDate}
            onChange={e => {
              onChange(ProvisionName.startDate, e.value as Date);
            }}
            showIcon={true}
            monthNavigator={true}
            yearNavigator={true}
            yearRange="2000:2030"
          />
        </div>
        <div className="content-section p-col-3">
          <h5>calculate to date</h5>
          <Calendar
            value={props.endDate}
            onChange={e => {
              onChange(ProvisionName.endDate, e.value as Date);
            }}
            showIcon={true}
            showButtonBar={true}
          />
        </div>
        <div className="p-col-6 p-grid">
          <div className="p-col-6">
            <h5>Operational Costs</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">$</span>
              <InputText
                value={props.costs}
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
          <div className="p-col-6">
            <h5>initial debt</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">$</span>
              <InputText
                value={props.debt}
                placeholder="initial debt "
                onChange={e => {
                  onChange(ProvisionName.debt, e.target as HTMLInputElement);
                }}
              />
            </div>
          </div>
          <div className="p-col-6">
            <h5>interests</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">%</span>
              <InputText
                value={props.interests}
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
      </div>
    </Panel>
  );
};

export default Provision;
