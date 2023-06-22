import "./index.scss";
import { GM_setValue } from "$";
import React, { useRef, useState, useEffect } from "react";
import { currentUrl, getElement } from "../../utils/index";
import { PAGE_LOGIN } from "../../config";
import { NextStepBtn } from "../index";

export interface stepPropsType {
  stepSet: Function;
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
  const setVisaInfo = () => {
    if (currentUrl() === PAGE_LOGIN) {
      return new Promise((resolve) => {
        let usernameInput = getElement(".mat-form-field-infix #mat-input-0");
        let passwordInput = getElement(".mat-form-field-infix #mat-input-1");
        (usernameInput as JQuery<HTMLElement>).val(email)[0].dispatchEvent(new Event("input"));
        (passwordInput as JQuery<HTMLElement>).val(password)[0].dispatchEvent(new Event("input"));
        resolve(true);
      });
    }
  };

  // 登录
  const login = async () => {
    const res = await setVisaInfo();
    console.log(res);
    if (res) {
      saveUserData();
      let btn = getElement("app-login button.btn-block");
      btn && (btn as JQuery<HTMLElement>)[0].dispatchEvent(new MouseEvent("click"));
      stepSet(2);
    }
  };

  useEffect(() => {
    console.log(props);
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
