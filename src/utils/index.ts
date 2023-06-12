import {
  PAGE_LOGIN,
  PAGE_APPLICATION,
  PAGE_INDEX,
  PAGE_DASHBOARD,
  PAGE_DETAILS,
  READING_TEXT_SUCCESS,
  TARGET_MONTH,
} from "../config/index";
import { GM_setValue, GM_getValue } from "$";

export const currentUrl = (): string => {
  return location.href.replace(/\?.*$/, "");
};

export const voiceRead = (message: string) => {
  return new Promise((resolve) => {
    if ("speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance();
      msg.lang = "zh-CN";
      msg.rate = 0.85;
      msg.text = message;
      window.speechSynthesis.speak(msg);
      resolve(msg.onend);
    }
  });
};

export const getElement = (clsName: string) => {
  try {
    const el = $(clsName);
    if (el && (el as JQuery<HTMLElement>)) {
      return el;
    } else {
      console.error("elements 类型判断错误");
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

export const JQueryInput = (el: JQuery<HTMLElement>) => {
  el[0].dispatchEvent(new Event("input"));
};

export const JQueryClick = (el: JQuery<HTMLElement>) => {
  el[0].dispatchEvent(new MouseEvent("click"));
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
      checkSchedule();
    } else {
      if (alertTips.text().trim().substr(14, 2) === TARGET_MONTH) {
        voiceRead(READING_TEXT_SUCCESS);
        btn.click();
      }
      btn[0].dispatchEvent(new MouseEvent("click"));
    }
  }
};

const checkSchedule = () => {
  if ($("app-session-timeout").length) {
    location.href = PAGE_LOGIN;
    return;
  }
  if (currentUrl() == PAGE_APPLICATION) {
    let selectLocation = $("#mat-select-0");
    let selectType = $("#mat-select-2");
    let selectVisaType = $("#mat-select-4");
    if (selectLocation.length && selectType.length && selectVisaType.length) {
      if (selectLocation.is(".mat-select-empty")) {
        let options = $("#mat-select-0-panel mat-option");
        if (options.length) {
          options.each(function () {
            let name = $(this).text().trim();
            if (name == "北京意大利签证申请中心") {
              $(this)[0].dispatchEvent(new MouseEvent("click"));
            }
          });
        } else {
          selectLocation[0].dispatchEvent(new MouseEvent("click"));
        }

        setTimeout(checkSchedule, 100);
      } else {
        if (selectType.is(".mat-select-empty")) {
          let options = $("#mat-select-2-panel mat-option");
          if (options.length) {
            options.each(function () {
              let name = $(this).text().trim();
              if (name == "意大利签证申请") {
                $(this)[0].dispatchEvent(new MouseEvent("click"));
              }
            });
          } else {
            selectType[0].dispatchEvent(new MouseEvent("click"));
          }

          setTimeout(checkSchedule, 100);
        } else {
          if (selectVisaType.is(".mat-select-empty")) {
            let options = $("#mat-select-4-panel mat-option");
            if (options.length) {
              let lastCheckIndex: any = GM_getValue("lastCheckIndex");
              if (
                typeof lastCheckIndex === "undefined" ||
                lastCheckIndex == null
              ) {
                lastCheckIndex = -1;
              }
              let checkIndex = lastCheckIndex + 1;
              if (checkIndex >= options.length) {
                checkIndex = 0;
              }
              let checkOption = $(options[checkIndex]);
              checkOption[0].dispatchEvent(new MouseEvent("click"));
              GM_setValue("lastCheckIndex", checkIndex);
            } else {
              selectVisaType[0].dispatchEvent(new MouseEvent("click"));
            }
            setTimeout(checkSchedule, 100);
          } else {
            checkResult();
          }
        }
      }
    } else {
      setTimeout(checkSchedule, 1000);
    }
  }
};
