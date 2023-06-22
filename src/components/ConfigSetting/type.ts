type idType =
  | "targetMonth"
  | "nationCode"
  | "applyCenter"
  | "visaType"
  | "timeoutHours"
  | "applyTypeStep"
  | "selectLocationStep"
  | "visaTypeStep"
  | "loginLimitTime";

type checkType = Omit<
  idType,
  "timesLimit" | "timeoutHours" | "selectLocationStep" | "applyTypeStep" | "visaTypeStep" | "loginLimitTime"
>;

interface settingInputType {
  id: idType;
  label: string | number;
  placeholder: string;
}

interface configType {
  targetMonth: string;
  nationCode: string;
  applyCenter: string;
  visaType: string;
  timesLimit: string | number;
  timeoutHours: string | number;
  selectLocationStep: string | number;
  applyTypeStep: string | number;
  visaTypeStep: string | number;
  loginLimitTime: string | number;
}
