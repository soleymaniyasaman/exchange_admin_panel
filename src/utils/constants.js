const dev = {

    BASE_URL: (app) => `https://api.mojex.devmoj.ir${app}/api/v1`,

    ADMIN_BASE_URL: "https://api.mojex.devmoj.ir/api/v1",

    BASE_CONFIG_URL: "https://api.mojex.devmoj.ir/consul/v1/kv",

    // PARAMS:

    COOKIE_EXPIRES: 1, // IN DAYS

}



const test = {

    BASE_URL: (app) => `https://api.mojex.devmoj.ir${app}/api/v1`,

    ADMIN_BASE_URL: "https://api.mojex.devmoj.ir/api/v1",

    BASE_CONFIG_URL: "https://api.mojex.devmoj.ir/consul/v1/kv",

    // PARAMS:

    COOKIE_EXPIRES: 14, // IN DAYS

}



const prod = {

    BASE_URL: (app) => `https://api.devmoj.ir${app}/api/v1`,

    ADMIN_BASE_URL: "https://api.devmoj.ir/api/v1",

    BASE_CONFIG_URL: "https://api.mojex.devmoj.ir/consul/v1/kv",

    // PARAMS:

    COOKIE_EXPIRES: 14, // IN DAYS

}



let config = dev



if (process.env.REACT_APP_STAGE === 'production') {

    config = prod

} else if (process.env.REACT_APP_STAGE === 'development') {

    config = dev

} else if (process.env.REACT_APP_STAGE === 'test') {

    config = test

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

    CONFIG_COIN: item => `/coins/${item}`,


    REPORTS_ORDER: "/report/order/",

    REPORTS_USERS: id => `/admin/users/reports/${id}/`,

    USERS_LIST: "/admin/users/",

    USERS_LIST_COUNT: "/admin/users/count/",

    USERS_DETAIL: id => `/admin/users/${id}/`,

    USERS_DEPOSIT: "/admin/deposit/",

    USERS_PAYMENT: "/admin/payment/",

    USERS_ORDERS: "/admin/order/",

    USERS_TRADES: "/admin/trade/",

    USERS_ACTIVITY: id => `/admin/users/${id}/login/activity/`,

    USERS_TRANSACTION_HISTORY: "/admin/transaction/",

    USER_MESSAGES: "/admin/message/",

    USER_SEND_MESSAGES: "/admin/message/send_message/",

    TERMS_AND_CONDITIONS_ITEM: id => `/admin/term_and_condition/${id}/`,

    TERMS_AND_CONDITIONS_UPDATE: id => `/admin/term_and_condition/${id}/`,

    CANCEL_ORDERS: id => `/admin/order/${id}/`,

    USERS_WALLET: id => `/admin/wallet/${id}/`,

    MESSAGE_DETAIL: id => `/admin/message/${id}/`,



    WITHDRAWS_LIST: "/admin/withdraw/",

    WITHDRAW_DETAIL: id => `/admin/withdraw/${id}/`,



    TICKETS_LIST: "/admin/ticketing/",

    TICKET_DETAIL: id => `/admin/ticketing/${id}/`,

    CLOSE_TICKET: id => `/admin/ticketing/${id}/close`,

    REPLY_TICKET: id => `/admin/ticketing/${id}/reply/`,



    LEVELS_LIST: "/admin/level/",

    LEVEL_DETAIL: id => `/admin/level/${id}/`,



    CARTS_LIST: "/Cart",

    SUPERVISOR_DETAIL: (nationalNo) => `/Supervisor/${nationalNo}`,

    SUPERVISOR_EXCEL: countryCode => `Supervisor/Bulk/${countryCode}`,

    SUPERVISOR_EXCEL_VALIDATION: countryCode => `Supervisor/ExcelUsers/${countryCode}`,



    // PARAMS:

    COOKIE_EXPIRES: 1 // IN DAYS



}, config);

