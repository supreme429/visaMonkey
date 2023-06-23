import "./index.scss";
import { GM_setValue, GM_getValue } from "$";
import React, { useRef, useState, useEffect } from "react";
import { currentUrl, getElement } from "../../utils/index";
import { PAGE_DASHBOARD, PAGE_LOGIN } from "../../config";
import { NextStepBtn } from "../index";

export interface stepPropsType {
  stepSet: Function;
}

interface infoType {
  username: string;
  password: string;
}

const Login: React.FC<stepPropsType> = (props) => {
  const { stepSet } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const onEmailChange = (e: any) => {
    setEmail((e.target as HTMLInputElement).value);
  };
  const onPasswordChange = (e: any) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  const saveUserData = () => {
    GM_setValue("username", email);
    GM_setValue("password", password);
  };

  // 填入登录信息
  const setVisaInfo = (data: infoType) => {
    if (currentUrl() === PAGE_LOGIN) {
      let usernameInput = getElement(".mat-form-field-infix #mat-input-0");
      let passwordInput = getElement(".mat-form-field-infix #mat-input-1");
      return new Promise((resolve) => {
        if (data) {
          (usernameInput as JQuery<HTMLElement>).val(data.username)[0].dispatchEvent(new Event("input"));
          (passwordInput as JQuery<HTMLElement>).val(data.password)[0].dispatchEvent(new Event("input"));
        } else {
          (usernameInput as JQuery<HTMLElement>).val(email)[0].dispatchEvent(new Event("input"));
          (passwordInput as JQuery<HTMLElement>).val(password)[0].dispatchEvent(new Event("input"));
        }
        resolve(true);
      });
    }
  };

  // 登录
  const [loginTime, setLoginTime] = useState(0);
  const login = async (data: infoType) => {
    const res = await setVisaInfo(data);
    if (res) {
      saveUserData();
      let btn = getElement("app-login button.btn-block");
      btn && (btn as JQuery<HTMLElement>)[0].dispatchEvent(new MouseEvent("click"));
      setTimeout(() => {
        if (currentUrl() === PAGE_DASHBOARD) {
          stepSet(2);
        } else {
          alert("登录未成功 将再次尝试登录");
          checkIsLogin();
          if (loginTime === 5) {
            return false;
          }
        }
      }, 500);
    }
  };

  const getLoginInfo = () => {
    return new Promise((resolve) => {
      let username = GM_getValue("username");
      let password = GM_getValue("password");
      if (username && password) {
        resolve({ username, password });
      } else {
        resolve(false);
      }
    });
  };

  const checkIsLogin = async () => {
    const res: unknown = await getLoginInfo();
    if (res) {
      setLoginTime(loginTime + 1);
      login(res as infoType);
    }
  };

  useEffect(() => {
    checkIsLogin();
  }, []);

  return (
    <div className="content">
      <div className="visaLogin">
        <div className="loginComponent">
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
        </div>
        <NextStepBtn text="下一步" handler={login} />
      </div>
    </div>
  );
};

export default Login;
