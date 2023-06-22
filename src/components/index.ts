import Login from "./Login";
import CustomerInfo from "./CustomerInfo";
import ConfigSetting from "./ConfigSetting";
import NextStepBtn from "./NextStepBtn";

export { Login, CustomerInfo, ConfigSetting, NextStepBtn };


interface stepPropsType {
  stepSet: Function;
}

interface CustomerData {
  lastName: string;
  firstName: string;
  gender?: string;
  email: string;
  passportNo: string;
  expire: string;
  telephone: string;
  children?: CustomerData[];
}

export type { stepPropsType, CustomerData };
