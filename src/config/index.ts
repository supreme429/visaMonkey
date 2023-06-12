const TARGET_MONTH = "06"; // 目标月份
const NATION_CODE = "ita"; // 国家简称代码
const FAIL_READ = false; // 失败是否朗读
const READING_TEXT_SUCCESS = `出现${TARGET_MONTH}月瑞士名额`;
const READING_TEXT_FAIL = `没有${TARGET_MONTH}月份的名额, 我将重新加载`;

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
  email: string;
  passportNo: string;
  expire: string;
  telephone: string;
  children?: CustomerData[];
}

const CUSTOMER_LIST: Array<CustomerData> = [
  {
    lastName: "",
    firstName: "",
    passportNo: "",
    expire: "",
    telephone: "",
    email: "",
    children: [
      {
        lastName: "",
        firstName: "",
        passportNo: "",
        expire: "",
        telephone: "",
        email: "",
      },
    ],
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
};
