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
