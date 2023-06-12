import { useState, useRef } from "react";
import { currentUrl, voiceRead, getElement } from "./utils/index";
import { GM_setValue, GM_getValue } from "$";
import {
  PAGE_LOGIN,
  PAGE_APPLICATION,
  PAGE_INDEX,
  PAGE_DASHBOARD,
  PAGE_DETAILS,
  READING_TEXT_SUCCESS,
  TARGET_MONTH,
} from "./config/index";
import "./App.scss";

function App() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const [customerList, setCustomerList] = useState(null);

  const onEmailChange = (e: any) => {
    setEmail((e.target as HTMLInputElement).value);
  };
  const onPasswordChange = (e: any) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  // 填入登录信息
  const setVisaInfo = () => {
    if (currentUrl() === PAGE_LOGIN) {
      return new Promise((resolve) => {
        GM_setValue("username", email);
        GM_setValue("password", password);
        let usernameInput = getElement(".mat-form-field-infix #mat-input-0");
        let passwordInput = getElement(".mat-form-field-infix #mat-input-1");
        (usernameInput as JQuery<HTMLElement>)
          .val(email)[0]
          .dispatchEvent(new Event("input"));
        (passwordInput as JQuery<HTMLElement>)
          .val(password)[0]
          .dispatchEvent(new Event("input"));
        setShow(false);
        resolve(true);
      });
    }
  };

  // 登录
  const login = async () => {
    const res = await setVisaInfo();
    if (res) {
      let btn = getElement("app-login button.btn-block");
      btn &&
        (btn as JQuery<HTMLElement>)[0].dispatchEvent(new MouseEvent("click"));
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
              if (name == "重庆意大利签证申请中心") {
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
        (btn as JQuery<HTMLElement>)
          .attr("target", "_self")[0]
          .dispatchEvent(new MouseEvent("click"));
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

  const autoRun = () => {
    let url = currentUrl();
    if (url == PAGE_INDEX) {
      init();
    } else if (url == PAGE_LOGIN) {
      // let username = GM_getValue("username");
      // let password = GM_getValue("password");
      // if (username && password) {
      //   login();
      // } else {
      //   alert("请填写登录信息");
      // }
      login();
    } else if (url == PAGE_DASHBOARD) {
      startApplication();
    } else if (url == PAGE_APPLICATION) {
      checkSchedule();
    } else if (url == PAGE_DETAILS) {
      //checkInfo();
    }
  };

  // 客户申请列表
  const customerApplyList = () => {
    return (
      <div className="customer-list">
        <textarea
          name="textarea"
          id="textarea"
          placeholder="客户信息列表"
        ></textarea>
      </div>
    );
  };

  // 重置
  const resetInfo = () => {
    return (
      <div
        className="btn reset"
        onClick={() => {
          window.location.reload();
        }}
      >
        重置
      </div>
    );
  };

  return (
    <div className="App">
      {show ? (
        <div className="content">
          <div className="visaLogin">
            <p className="login-input">
              邮箱
              <input
                type="text"
                className="info-input"
                placeholder="登录visa帐号"
                value={email}
                ref={emailRef}
                onChange={onEmailChange}
              />
            </p>
            <p className="login-input">
              密码
              <input
                type="password"
                className="info-input"
                placeholder="登录密码"
                value={password}
                ref={passwordRef}
                onChange={onPasswordChange}
              />
            </p>
            {customerApplyList()}
            <div className="btnLine">
              <div
                className="btn start"
                onClick={() => {
                  autoRun();
                }}
              >
                开始
              </div>
              {resetInfo()}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="card"
          onClick={() => {
            setShow(true);
          }}
        ></div>
      )}
    </div>
  );
}

export default App;
