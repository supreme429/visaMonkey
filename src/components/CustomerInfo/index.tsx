import React, { useEffect, useState } from "react";
import "./index.scss";
import type { stepPropsType } from "../index";
import { NextStepBtn } from "../index";
import { GM_setValue, GM_getValue } from "$";
import { currentUrl, clickBlank, clickTipsBtn, LoginLimit, voiceRead } from "../../utils/index";
import { PAGE_APPLICATION, PAGE_LOGIN, READING_TEXT_SUCCESS } from "../../config";

const CustomerInfo: React.FC<stepPropsType> = (props) => {
  const { stepSet } = props;
  const userConfig: configType = GM_getValue("userConfig");
  const [customerList, setCustomerList] = useState<CustomerData[]>();
  const [textareaData, setTextareaData] = useState();
  const [loopEngine, setLoopEngine] = useState<boolean>(false);

  // 选择签证中心
  const selectLocationStep = () => {
    return new Promise((resolve) => {
      let selectLocation = $("#mat-select-0");
      if (selectLocation.is(".mat-select-empty")) {
        let options = $("#mat-select-0-panel mat-option");
        if (options.length) {
          options.each(function () {
            let name = $(this).text().trim();
            if (name === userConfig.applyCenter) {
              $(this)[0].click();
              resolve(true);
            }
          });
        } else {
          selectLocation[0].click();
        }
        // setTimeout(startLoop, 100 * Number(userConfig.applyTypeStep));
      } else {
        resolve(false);
      }
    });
  };
  // 选择申请类型
  const selectApplyTypeStep = () => {
    return new Promise((resolve) => {
      let selectType = $("#mat-select-2");
      if (selectType.is(".mat-select-empty")) {
        let options = $("#mat-select-2-panel mat-option");
        if (options.length) {
          options.each(function () {
            let name = $(this).text().trim();
            if (name === userConfig.visaType) {
              $(this)[0].click();
              resolve(true);
            }
          });
        } else {
          selectType[0].click();
        }
        // setTimeout(startLoop, 1000 * Number(userConfig.applyTypeStep));
      } else {
        resolve(false);
      }
    });
  };

  // 选择签证类型
  const selectVisaTypeStep = () => {
    let selectVisaType = $("#mat-select-4");
    return new Promise((resolve) => {
      if (selectVisaType.is(".mat-select-empty")) {
        let options = $("#mat-select-4-panel mat-option");
        if (options.length) {
          let lastCheckIndex: number = GM_getValue("lastCheckIndex");
          if (typeof lastCheckIndex === "undefined" || lastCheckIndex == null) {
            lastCheckIndex = -1;
          }
          let checkIndex = lastCheckIndex + 1;
          if (checkIndex >= options.length) {
            checkIndex = 0;
          }
          let checkOption = $(options[checkIndex]);
          checkOption[0].click();
          GM_setValue("lastCheckIndex", checkIndex);
        } else {
          selectVisaType[0].click();
        }
        resolve(false);
      } else {
        resolve(true);
        // checkResult();
      }
    });
  };

  const checkResult = () => {
    let loading = $(".ngx-overlay.loading-foreground");
    if (loading.length) {
      setTimeout(checkResult, 1000);
    } else {
      let btn = $("app-eligibility-criteria form button");
      let alertTips = $(".alert.alert-info.border-0.rounded-0");

      if (btn.is(".mat-button-disabled")) {
        $("form")[1].onreset;
        selectVisaTypeStep();
      } else {
        if (alertTips.text().trim().substr(14, 2) === userConfig.targetMonth) {
          voiceRead(READING_TEXT_SUCCESS);
          btn[0].click();
        } else {
          voiceRead("没有名额,即将重新查询");
        }
        btn[0].click();
      }
    }
  };

  const checkSchedule = async () => {
    if ($("app-session-timeout").length) {
      location.href = PAGE_LOGIN;
      return;
    }
    if (currentUrl() == PAGE_APPLICATION) {
      let selectLocation = $("#mat-select-0");
      let selectType = $("#mat-select-2");
      let selectVisaType = $("#mat-select-4");
      if (selectLocation.length && selectType.length && selectVisaType.length) {
        await selectLocationStep();
        await selectApplyTypeStep();
        const res = await selectVisaTypeStep();
        if (res) {
          checkResult();
        } else {
          setTimeout(selectVisaTypeStep, 1000 * Number(userConfig.visaTypeStep));
        }
      } else {
        setTimeout(checkSchedule, 1000);
      }
    }
  };

  const theLoop = async (trigger: boolean) => {
    clickBlank();
    clickTipsBtn();
    checkSchedule();
    // const timer = setInterval(() => {
    //   clickBlank();
    //   clickTipsBtn();
    //   checkSchedule();
    // }, 5000);
    // if (loopEngine === false) {
    //   clearInterval(timer);
    // }
  };

  const handleTextareaChange = (e: any) => {
    setTextareaData(e.target.value);
  };

  const loopTrigger = (trigger: boolean) => {
    setLoopEngine(trigger);
  };

  useEffect(() => {
    theLoop(loopEngine);
  }, [loopEngine]);

  return (
    <div className="customerList">
      <div className="customer_list">
        <textarea
          name="textarea"
          id="textarea"
          placeholder="客户信息列表(可以不填)"
          value={textareaData}
          onChange={(event) => [handleTextareaChange(event)]}
        ></textarea>
      </div>
      <NextStepBtn
        text="开始"
        handler={() => {
          loopTrigger(true);
        }}
      />
      <NextStepBtn
        text="停止"
        handler={() => {
          loopTrigger(false);
        }}
      />
    </div>
  );
};

export default CustomerInfo;
