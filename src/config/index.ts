const TARGET_MONTH = "06"; // 目标月份
const NATION_CODE = "che"; // 国家简称代码
const FAIL_READ = false; // 失败是否朗读
const READING_TEXT_SUCCESS = `出现${TARGET_MONTH}月${NATION_CODE}名额`;
const READING_TEXT_FAIL = `没有${TARGET_MONTH}月份的名额`;
// 签证中心
const OPTIONS_TARGET_APPLY_CENTER = "重庆意大利签证申请中心";
// 预约类型
const OPTIONS_TARGET_VISA_TYPE = "意大利签证申请";
// 限制次数
const TIMES_LIMITS = 100000000000000;
// 程序流程暂停时长（小时）
const TIMEOUT_HOURS = 2;
// 选择中心
const SELECT_LOCATION_STEP = 5;
// 申请类型
const APPLY_TYPE_STEP = 5;
// 签证类型(标准 / VIP)
const VISA_TYPE_STEP = 5;

// 登录次数限制
const LOGIN_LIMIT_TIME = 20;

const PAGE_INDEX = `https://visa.vfsglobal.com/chn/zh/${NATION_CODE}/book-an-appointment`;
const PAGE_LOGIN = `https://visa.vfsglobal.com/chn/zh/${NATION_CODE}/login`;
const PAGE_DASHBOARD = `https://visa.vfsglobal.com/chn/zh/${NATION_CODE}/dashboard`;
const PAGE_APPLICATION = `https://visa.vfsglobal.com/chn/zh/${NATION_CODE}/application-detail`;
const PAGE_DETAILS = `https://visa.vfsglobal.com/chn/zh/${NATION_CODE}/your-details`;

// 客户信息列表
/**
 * ? lastName: 名; firstName: 姓氏; birth: 生日;
 * ? passport: 护照号; expire: 护照到期日期; telephone:电话; email:邮箱;
 * ? nation: 国家; prefix：国家区号;
 */

export interface CustomerData {
  lastName: string;
  firstName: string;
  gender?: string;
  email: string;
  passportNo: string;
  expire: string;
  telephone: string;
  children?: CustomerData[];
}

const CUSTOMER_LIST: CustomerData[] = [
  {
    lastName: "",
    firstName: "",
    gender: "",
    passportNo: "",
    expire: "",
    telephone: "",
    email: "",
  },
];

export {
  PAGE_INDEX,
  PAGE_LOGIN,
  PAGE_DETAILS,
  PAGE_DASHBOARD,
  PAGE_APPLICATION,
  READING_TEXT_SUCCESS,
  READING_TEXT_FAIL,
  FAIL_READ,
  TARGET_MONTH,
  NATION_CODE,
  CUSTOMER_LIST,
  OPTIONS_TARGET_APPLY_CENTER,
  OPTIONS_TARGET_VISA_TYPE,
  LOGIN_LIMIT_TIME,
  TIMES_LIMITS,
  TIMEOUT_HOURS,
  SELECT_LOCATION_STEP,
  APPLY_TYPE_STEP,
  VISA_TYPE_STEP,
};
