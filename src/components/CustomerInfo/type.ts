interface CustomerData {
  lastName: string; // 名(拼音大写)
  firstName: string; // 姓
  gender: string; // 性别
  birth: string; // 生日 dd/MM/YYYY
  email: string; // 邮箱
  passportNo: string; // 护照号
  nation: "中国" | string; // 现国籍
  nationAreaCode: string; // 国家电话区号
  expire: string; // 护照过期时间
  telephone: string; // 电话
  children?: CustomerData[]; // 子女
}