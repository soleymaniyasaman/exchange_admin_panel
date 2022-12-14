"use strict";

var dev = {
  BASE_URL: function BASE_URL(app) {
    return "https://api.mojex.devmoj.ir".concat(app, "/api/v1");
  },
  ADMIN_BASE_URL: "https://api.mojex.devmoj.ir/api/v1",
  BASE_CONFIG_URL: "https://api.mojex.devmoj.ir/consul/v1/kv",
  // PARAMS:
  COOKIE_EXPIRES: 1 // IN DAYS

};
var test = {
  BASE_URL: function BASE_URL(app) {
    return "https://api.mojex.devmoj.ir".concat(app, "/api/v1");
  },
  ADMIN_BASE_URL: "https://api.mojex.devmoj.ir/api/v1",
  BASE_CONFIG_URL: "https://api.mojex.devmoj.ir/consul/v1/kv",
  // PARAMS:
  COOKIE_EXPIRES: 14 // IN DAYS

};
var prod = {
  BASE_URL: function BASE_URL(app) {
    return "https://api.devmoj.ir".concat(app, "/api/v1");
  },
  ADMIN_BASE_URL: "https://api.devmoj.ir/api/v1",
  BASE_CONFIG_URL: "https://api.mojex.devmoj.ir/consul/v1/kv",
  // PARAMS:
  COOKIE_EXPIRES: 14 // IN DAYS

};
var config = dev;

if (process.env.REACT_APP_STAGE === 'production') {
  config = prod;
} else if (process.env.REACT_APP_STAGE === 'development') {
  config = dev;
} else if (process.env.REACT_APP_STAGE === 'test') {
  config = test;
}

Object.assign(module.exports, {
  //MESSAGES
  SUCCESS_MESSAGE: "عملیات با موفقیت انجام شد",
  ERROR_MESSAGE: "با خطا همراه بود",
  CONFLICT_MESSAGE: "مشکلی به وجود آمده است",
  SUPPORT_TEL: "02139936390",
  SUPPORT_TEL_VIEW: "021-39936390",
  // ROUTES
  // BASE_URL: "http://79.175.138.60:44084/api/v1",
  // BASE_URL: (app) => `https://api.mojex.devmoj.ir${app}/api/v1`,
  // ADMIN_BASE_URL: "https://api.mojex.devmoj.ir/api/v1",
  // // BASE_URL: "https://appnew.netbean.ir/api/v1",
  // MEDIA_URL: "https://sso.netbean.ir/ResourceManager/api/v1",
  TRADING_APP: "/trading",
  IAM_APP: "/iam",
  EXCHANGE_CONFIG: "/exchange",
  ACCOUNTING_APP: "/accounting",
  PREFIX: "",
  // SSO_SERVER: "https://idp.vs-code.ir", //AFRANET
  // SSO_LOGIN_REDIRECT: "https://front.vs-code.ir/login", //AFRANET
  // USER_PROFILE: nationalNo => `/Profile/GetByNationalNo?NationalNo=${nationalNo}`,
  AUTH_LOGIN: "https://api.mojex.devmoj.ir/iam/api/v1/auth/login/",
  AUTH_REFRESH: "https://api.mojex.devmoj.ir/iam/api/v1/auth/refresh-token/",
  CONFIG_COINS: "/coins/?recurse=true",
  CONFIG_COIN: function CONFIG_COIN(item) {
    return "/coins/".concat(item);
  },
  REPORTS_ORDER: "/report/order/",
  REPORTS_USERS: function REPORTS_USERS(id) {
    return "/admin/users/reports/".concat(id, "/");
  },
  USERS_LIST: "/admin/users/",
  USERS_LIST_COUNT: "/admin/users/count/",
  USERS_DETAIL: function USERS_DETAIL(id) {
    return "/admin/users/".concat(id, "/");
  },
  USERS_DEPOSIT: "/admin/deposit/",
  USERS_PAYMENT: "/admin/payment/",
  USERS_ORDERS: "/admin/order/",
  USERS_TRADES: "/admin/trade/",
  USERS_ACTIVITY: function USERS_ACTIVITY(id) {
    return "/admin/users/".concat(id, "/login/activity/");
  },
  USERS_TRANSACTION_HISTORY: "/admin/transaction/",
  USER_MESSAGES: "/admin/message/",
  USER_SEND_MESSAGES: "/admin/message/send_message/",
  TERMS_AND_CONDITIONS_ITEM: function TERMS_AND_CONDITIONS_ITEM(id) {
    return "/admin/term_and_condition/".concat(id, "/");
  },
  TERMS_AND_CONDITIONS_UPDATE: function TERMS_AND_CONDITIONS_UPDATE(id) {
    return "/admin/term_and_condition/".concat(id, "/");
  },
  CANCEL_ORDERS: function CANCEL_ORDERS(id) {
    return "/admin/order/".concat(id, "/");
  },
  USERS_WALLET: function USERS_WALLET(id) {
    return "/admin/wallet/".concat(id, "/");
  },
  MESSAGE_DETAIL: function MESSAGE_DETAIL(id) {
    return "/admin/message/".concat(id, "/");
  },
  WITHDRAWS_LIST: "/admin/withdraw/",
  WITHDRAW_DETAIL: function WITHDRAW_DETAIL(id) {
    return "/admin/withdraw/".concat(id, "/");
  },
  TICKETS_LIST: "/admin/ticketing/",
  TICKET_DETAIL: function TICKET_DETAIL(id) {
    return "/admin/ticketing/".concat(id, "/");
  },
  CLOSE_TICKET: function CLOSE_TICKET(id) {
    return "/admin/ticketing/".concat(id, "/close");
  },
  REPLY_TICKET: function REPLY_TICKET(id) {
    return "/admin/ticketing/".concat(id, "/reply/");
  },
  LEVELS_LIST: "/admin/level/",
  LEVEL_DETAIL: function LEVEL_DETAIL(id) {
    return "/admin/level/".concat(id, "/");
  },
  CARTS_LIST: "/Cart",
  SUPERVISOR_DETAIL: function SUPERVISOR_DETAIL(nationalNo) {
    return "/Supervisor/".concat(nationalNo);
  },
  SUPERVISOR_EXCEL: function SUPERVISOR_EXCEL(countryCode) {
    return "Supervisor/Bulk/".concat(countryCode);
  },
  SUPERVISOR_EXCEL_VALIDATION: function SUPERVISOR_EXCEL_VALIDATION(countryCode) {
    return "Supervisor/ExcelUsers/".concat(countryCode);
  },
  // PARAMS:
  COOKIE_EXPIRES: 1 // IN DAYS

}, config);