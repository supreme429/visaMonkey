import styles from "./index.module.scss";
import React, { useState, useEffect } from "react";
import type { stepPropsType } from "../index";
import { NextStepBtn } from "../index";
import { GM_setValue } from "$";

const settingList: settingInputType[] = [
  {
    id: "targetMonth",
    label: "目标月份",
    placeholder: "例如: 07 | 08",
  },
  {
    id: "nationCode",
    label: "国家简称代码",
    placeholder: "例如: che | ita",
  },
  {
    id: "applyCenter",
    label: "签证中心",
    placeholder: "请输入",
  },
  {
    id: "visaType",
    label: "预约类型",
    placeholder: "请输入",
  },
  {
    id: "timeoutHours",
    label: "流程暂停时长(小时)",
    placeholder: "请输入",
  },
  {
    id: "selectLocationStep",
    label: "选择中心间隔时间(秒)",
    placeholder: "请输入",
  },
  {
    id: "applyTypeStep",
    label: "申请类型间隔时间(秒)",
    placeholder: "请输入",
  },
  {
    id: "visaTypeStep",
    label: "签证类型间隔时间(秒)",
    placeholder: "请输入",
  },
  {
    id: "loginLimitTime",
    label: "总登录次数限制(次)",
    placeholder: "请输入",
  },
];

const ConfigSetting: React.FC<stepPropsType> = (props) => {
  const { stepSet } = props;
  const [config, setConfig] = useState<configType>({
    targetMonth: "",
    nationCode: "",
    applyCenter: "",
    visaType: "",
    timesLimit: "1000000000000000",
    timeoutHours: "2",
    selectLocationStep: "5",
    applyTypeStep: "5",
    visaTypeStep: "5",
    loginLimitTime: "20",
  });

  const onConfigChange = (e: any, id: string) => {
    setConfig((oldConfig) => {
      return {
        ...oldConfig,
        [id]: (e.target as HTMLInputElement).value,
      };
    });
  };

  const onFocusInput = (e: any, id: idType) => {
    setConfig((oldConfig) => {
      return {
        ...oldConfig,
        [id]: "",
      };
    });
  };

  const handler = () => {
    // alert(JSON.stringify(config));
    if (!config.targetMonth || !config.nationCode || !config.applyCenter || !config.visaType) {
      alert(`请填写完整配置项`);
    } else {
      GM_setValue("userConfig", config);
      stepSet(3);
    }
  };

  return (
    <div className={styles.ConfigSetting}>
      {settingList.map((item: settingInputType) => {
        return (
          <div className={styles.inputLine}>
            <span className={styles.label}>{item.label}</span>
            <input
              className={styles.inputStyle}
              type="text"
              placeholder={item.placeholder}
              value={config[item.id]}
              onChange={(event) => {
                onConfigChange(event, item.id);
              }}
              onFocus={(event) => {
                onFocusInput(event, item.id);
              }}
            />
          </div>
        );
      })}
      <NextStepBtn
        text="下一步"
        handler={() => {
          handler();
        }}
      />
    </div>
  );
};

export default ConfigSetting;
