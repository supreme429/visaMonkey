import React from "react";
import "./index.scss";

interface nextBtnPropsType {
  text: string;
  handler: Function;
}

const NextStepBtn: React.FC<nextBtnPropsType> = (props) => {
  const { text, handler } = props;
  return (
    <div className="nextBtnLine">
      <div
        className="btnStart start"
        onClick={() => {
          handler();
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default NextStepBtn;
