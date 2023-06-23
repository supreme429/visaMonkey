import { useState, useRef, useEffect } from "react";
import { currentUrl, voiceRead, getElement } from "./utils/index";
import { GM_setValue, GM_getValue } from "$";
import {
  PAGE_LOGIN,
  PAGE_APPLICATION,
  PAGE_INDEX,
  PAGE_DASHBOARD,
  PAGE_DETAILS,
  READING_TEXT_SUCCESS,
  LOGIN_LIMIT_TIME,
  TIMES_LIMITS,
  TIMEOUT_HOURS,
  VISA_TYPE_STEP,
} from "./config/index";
import "./App.scss";
import { Login, CustomerInfo, ConfigSetting } from "./components";

function App() {
  const [show, setShow] = useState(false);
  const userConfig = GM_getValue("userConfig") as configType;
  // const [email, setEmail] = useState<string>("");
  // const emailRef = useRef<HTMLInputElement>(null);
  // const [password, setPassword] = useState("");
  // const passwordRef = useRef<HTMLInputElement>(null);

  // const onEmailChange = (e: any) => {
  //   setEmail((e.target as HTMLInputElement).value);
  // };
  // const onPasswordChange = (e: any) => {
  //   setPassword((e.target as HTMLInputElement).value);
  // };

  // const saveUserData = () => {
  //   GM_setValue("username", email);
  //   GM_setValue("password", password);
  // };

  // // 填入登录信息
  // const setVisaInfo = () => {
  //   if (currentUrl() === PAGE_LOGIN) {
  //     return new Promise((resolve) => {
  //       let usernameInput = getElement(".mat-form-field-infix #mat-input-0");
  //       let passwordInput = getElement(".mat-form-field-infix #mat-input-1");
  //       (usernameInput as JQuery<HTMLElement>).val(email)[0].dispatchEvent(new Event("input"));
  //       (passwordInput as JQuery<HTMLElement>).val(password)[0].dispatchEvent(new Event("input"));
  //       setShow(false);
  //       resolve(true);
  //     });
  //   }
  // };

  // // 登录
  // const login = async () => {
  //   const res = await setVisaInfo();
  //   if (res) {
  //     let btn = getElement("app-login button.btn-block");
  //     btn && (btn as JQuery<HTMLElement>)[0].dispatchEvent(new MouseEvent("click"));
  //   }
  // };

  // 选择签证中心
  const selectLocationStep = () => {
    let selectLocation = $("#mat-select-0");
    return new Promise((resolve) => {
      if (selectLocation.is(".mat-select-empty")) {
        let options = $("#mat-select-0-panel mat-option");
        if (options.length) {
          options.each(function () {
            let name = $(this).text().trim();
            if (name === userConfig.applyCenter) {
              $(this)[0].dispatchEvent(new MouseEvent("click"));
              resolve(true);
            }
          });
        } else {
          selectLocation[0].dispatchEvent(new MouseEvent("click"));
        }
        // setTimeout(checkSchedule, 1000 * SELECT_LOCATION_STEP);
      } else {
        resolve(false);
      }
    });
  };
  // 选择申请类型
  const selectApplyTypeStep = () => {
    let selectType = $("#mat-select-2");
    return new Promise((resolve) => {
      if (selectType.is(".mat-select-empty")) {
        let options = $("#mat-select-2-panel mat-option");
        if (options.length) {
          options.each(function () {
            let name = $(this).text().trim();
            if (name === userConfig.visaType) {
              $(this)[0].dispatchEvent(new MouseEvent("click"));
              resolve(true);
            }
          });
        } else {
          selectType[0].dispatchEvent(new MouseEvent("click"));
        }
        // setTimeout(checkSchedule, 1000 * APPLY_TYPE_STEP);
      } else {
        resolve(false);
      }
    });
  };
  // 选择签证类型
  const selectVisaTypeStep = () => {
    let selectVisaType = $("#mat-select-4");
    return new Promise(() => {
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
          checkOption[0].dispatchEvent(new MouseEvent("click"));
          GM_setValue("lastCheckIndex", checkIndex);
        } else {
          selectVisaType[0].dispatchEvent(new MouseEvent("click"));
        }
        setTimeout(selectVisaTypeStep, 1000 * VISA_TYPE_STEP);
      } else {
        checkResult();
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
          checkSchedule();
        }, 1000 * 60 * 60 * TIMEOUT_HOURS);
      } else {
        resolve(true);
      }
    });
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
        selectLocationStep().then((done) => {
          done &&
            selectApplyTypeStep().then((done) => {
              done && selectVisaTypeStep();
            });
        });
      }
      // else {
      //   setTimeout(checkSchedule, 1000);
      // }
    }
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
        if (alertTips.text().trim().substr(14, 2) === userConfig.targetMonth) {
          voiceRead(READING_TEXT_SUCCESS);
          btn[0].dispatchEvent(new MouseEvent("click"));
        }
        btn[0].dispatchEvent(new MouseEvent("click"));
      }
    }
  };

  const init = () => {
    if (currentUrl() == PAGE_INDEX) {
      let btn = $("a.lets-get-started");
      if (btn.length) {
        (btn as JQuery<HTMLElement>).attr("target", "_self")[0].dispatchEvent(new MouseEvent("click"));
      } else {
        setTimeout(init, 1000);
      }
    }
  };

  const startApplication = () => {
    if (currentUrl() == PAGE_DASHBOARD) {
      let btn = $(".mat-focus-indicator.btn.mat-btn-lg.btn-block");
      if (btn.length) {
        btn[0].dispatchEvent(new MouseEvent("click"));
        setTimeout(checkSchedule, 1000);
      } else {
        setTimeout(startApplication, 1000);
      }
    }
  };

  const userInfo = () => {
    let lastName = $(".mat-form-field-infix #mat-input-2");
    let firstName = $(".mat-form-field-infix #mat-input-3");
    let nations = $(".mat-form-field-infix #mat-select-value-7"); // #mat-select-value-7
    let passport = $(".mat-form-field-infix #mat-input-4");
    let countryCode = $(".mat-form-field-infix #mat-input-5");
    let phoneNumber = $(".mat-form-field-infix #mat-input-6");
    let email = $(".mat-form-field-infix #mat-input-7");
  };

  const autoRun = () => {
    let url = currentUrl();
    if (url == PAGE_INDEX) {
      init();
    } else if (url == PAGE_DASHBOARD) {
      startApplication();
    } else if (url == PAGE_APPLICATION) {
      checkSchedule();
    } else if (url == PAGE_DETAILS) {
      //checkInfo();
    }
  };

  const [step, setStep] = useState<number>(1);
  useEffect(() => {
    if (step === 999) {
      setStep(2);
      setShow(false);
    }
  }, [step]);

  const start = () => {
    // let username = GM_getValue("username");
    // let password = GM_getValue("password");
    // if (username && password) {
    //   setStep(2);
    // } else {
    //   setShow(true);
    // }
    setShow(true);
  };
  return (
    <div className="App">
      {show ? (
        <div className="content">
          {step === 1 && <Login stepSet={setStep} />}
          {step === 2 && <ConfigSetting stepSet={setStep} />}
          {step === 3 && <CustomerInfo stepSet={setStep} />}
        </div>
      ) : (
        <div
          className="card"
          onClick={() => {
            start();
          }}
        ></div>
      )}
    </div>
  );
}

export default App;
