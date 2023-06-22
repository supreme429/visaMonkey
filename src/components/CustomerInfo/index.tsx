import React, { useState } from "react";
import "./index.scss";
import type { stepPropsType } from "../index";
import { NextStepBtn } from "../index";

const CustomerInfo: React.FC<stepPropsType> = (props) => {
  const { stepSet } = props;
  // 客户申请列表
  const customerApplyList = () => {
    return (
      <div className="customer_list">
        <textarea name="textarea" id="textarea" placeholder="客户信息列表"></textarea>
      </div>
    );
  };

  const handleNextStep = () => {
    stepSet(3);
  };

  return (
    <div className="customerList">
      {customerApplyList()}
      <NextStepBtn text="开始" handler={handleNextStep} />
    </div>
  );
};

export default CustomerInfo;
