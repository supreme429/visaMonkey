import { useState } from "react";
import styles from './index.module.scss'

const Content = () => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.content}>
      <div className="visaLogin">
        <p className="login-input">
          邮箱
          <input className="info-input" />
        </p>
        <p className="login-input">
          密码
          <input className="info-input" />
        </p>
      </div>
      <div
        className="start"
        onClick={() => {
          setShow(false);
        }}
      >
        开始
      </div>
    </div>
  );
};

export default Content;
