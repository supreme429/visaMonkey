import {
  PAGE_LOGIN,
  PAGE_APPLICATION,
  PAGE_INDEX,
  PAGE_DASHBOARD,
  PAGE_DETAILS,
  READING_TEXT_SUCCESS,
  TARGET_MONTH,
  LOGIN_LIMIT_TIME,
  TIMES_LIMITS,
  TIMEOUT_HOURS
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
  el[0].click();
};
// 点击「空白」
export const clickBlank = () => {
  let blank_span = $("span.ml-auto");
  blank_span[0].click();
};

// 点击「保持」 - 选择器不精确
export const clickTipsBtn = () => {
  let tipsBtn = $("#cdk-overlay-3 mat-dialog-container mat-modal-delete mat-dialog-actions row mat-btn-lg btn-block");
  if (tipsBtn.length) {
    tipsBtn[0].click();
  }
};

// 登录次数限制
let loginTime = 0;
export const LoginLimit = () => {
  return new Promise((resolve) => {
    if (loginTime >= LOGIN_LIMIT_TIME) {
      resolve(false);
    } else {
      resolve(true);
    }
  });
};

// 请求限制
let QUERY_TIMES = 0;
const queryLimit = () => {
  return new Promise((resolve) => {
    QUERY_TIMES++;
    console.log("QUERY_TIMES: ", QUERY_TIMES);
    if (QUERY_TIMES >= TIMES_LIMITS) {
      console.log("========");
      resolve(false);
      setTimeout(() => {
        QUERY_TIMES = 0;
        // checkSchedule();
      }, 1000 * 60 * 60 * TIMEOUT_HOURS);
    } else {
      resolve(true);
    }
  });
};
