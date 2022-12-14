import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style.css';

const SideBar = () => {
    const SideBarData = [
        {
            elementNo: 0,
            title: "داشبورد",
            icon: "/assets/drawer/deactive/dashboard-1.svg",
            activeIcon: "/assets/drawer/active/dashboard-1.svg",
            link: "/dashboard",
            spanDown: "/assets/drawer/deactive/dashboard-24px.svg",
            spanDownActive: "/assets/drawer/active/dashboard-24px.svg",
            childrenItems: [],
        },
        {
            elementNo: 1,
            title: "کاربران سامانه",
            icon: "/assets/drawer/deactive/account_balance_wallet-2.svg",
            activeIcon: "/assets/drawer/active/account_balance_wallet-2.svg",
            link: "/users",
            spanDown: "/assets/drawer/deactive/dashboard-24px.svg",
            spanDownActive: "/assets/drawer/active/dashboard-24px.svg",
            childrenItems: [
                {
                    title: "کاربران",
                    link: "/users/users",
                },
                {
                    title: "ادمین ها",
                    link: "/users/admins",
                },
                {
                    title: "ربات ها",
                    link: "/users/robots",
                },
            ],
        },
        {
            elementNo: 2,
            title: "سفارش های باز",
            icon: "/assets/drawer/deactive/account_balance_wallet-1.svg",
            activeIcon: "/assets/drawer/active/account_balance_wallet-1.svg",
            link: "/orders",
            spanDown: "/assets/drawer/deactive/dashboard-24px.svg",
            spanDownActive: "/assets/drawer/active/dashboard-24px.svg",
            childrenItems: [],
        },
        {
            elementNo: 3,
            title: "حسابداری",
            icon: "/assets/drawer/deactive/account_balance_wallet-24px.svg",
            activeIcon: "/assets/drawer/active/account_balance_wallet-24px.svg",
            link: "/accountant",
            spanDown: "/assets/drawer/deactive/dashboard-24px.svg",
            spanDownActive: "/assets/drawer/active/dashboard-24px.svg",
            childrenItems: [
                {
                    title: "تایید برداشت ریال",
                    link: "/accountant/rial",
                },
                {
                    title: "تایید برداشت ارز",
                    link: "/accountant/crypto",
                },
                {
                    title: "تاریخچه تراکنش‌ها",
                    link: "/accountant/history",
                },
            ],
        },
        {
            elementNo: 4,
            title: "تاریخچه",
            icon: "/assets/drawer/deactive/history_edu-24px.svg",
            activeIcon: "/assets/drawer/active/history_edu-24px.svg",
            link: "/history",
            spanDown: "/assets/drawer/deactive/dashboard-24px.svg",
            spanDownActive: "/assets/drawer/active/dashboard-24px.svg",
            childrenItems: [
                {
                    title: 'تاریخچه سفارش‌ها',
                    link: '/history/orders'
                },
                {
                    title: 'تاریخچه معاملات',
                    link: '/history/trades'
                },
                {
                    title: 'تاریخچه واریزها',
                    link: '/history/deposits'
                },
                {
                    title: 'تاریخچه برداشت‌ها',
                    link: '/history/withdraws'
                },
            ]
        },
        {
            elementNo: 5,
            title: "گزارشات",
            icon: "/assets/drawer/deactive/history_edu-24px.svg",
            activeIcon: "/assets/drawer/active/history_edu-24px.svg",
            link: "/reports",
            spanDown: "/assets/drawer/deactive/dashboard-24px.svg",
            spanDownActive: "/assets/drawer/active/dashboard-24px.svg",
            childrenItems: [
                {
                    title: 'کاربران',
                    link: '/reports/users'
                },
                {
                    title: 'سفارش ها',
                    link: '/reports/orders'
                },
                {
                    title: 'معاملات',
                    link: '/reports/trades'
                },
                // {
                //     title: 'تاریخچه برداشت‌ها',
                //     link: '/history/withdraws'
                // },
            ]
        },
        // {
        //     elementNo: 5,
        //     title:"بازارها",
        //     icon:"/assets/drawer/deactive/toll-24px.svg",
        //     activeIcon:"/assets/drawer/active/toll-24px.svg",
        //     link:"/toll",
        //     spanDown:"/assets/drawer/deactive/dashboard-24px.svg",
        //     spanDownActive:"/assets/drawer/active/dashboard-24px.svg",
        //     childrenItems: [],
        // },
        {
            elementNo: 6,
            title: "مدیریت صفحات",
            icon: "/assets/drawer/deactive/history_edu-24px.svg",
            activeIcon: "/assets/drawer/active/history_edu-24px.svg",
            link: "/managemant",
            spanDown: "/assets/drawer/deactive/dashboard-24px.svg",
            spanDownActive: "/assets/drawer/active/dashboard-24px.svg",
            childrenItems: [
                {
                    title: 'مدیریت صفحه قوانین و مقررات',
                    link: '/managemant/policies'
                },
                {
                    title: 'مدیریت صفحه راهنما',
                    link: '/managemant/help'
                },
                {
                    title: 'مدیریت صفحه درباره ما',
                    link: '/managemant/aboutUs'
                }
            ]
        },
        {
            title: "مدیریت کارمزد",
            icon: "/assets/drawer/deactive/monetization_on-24px.svg",
            activeIcon: "/assets/drawer/active/monetization_on-24px.svg",
            link: "/commissions",
            spanDown: "/assets/drawer/deactive/dashboard-24px.svg",
            spanDownActive: "/assets/drawer/active/dashboard-24px.svg",
            childrenItems: [],
        },
        {
            elementNo: 7,
            title: "پیام ها",
            icon: "/assets/drawer/deactive/email-24px (1).svg",
            activeIcon: "/assets/drawer/active/email-24px (1).svg",
            link: "/messages",
            spanDown: "/assets/drawer/deactive/dashboard-24px.svg",
            spanDownActive: "/assets/drawer/active/dashboard-24px.svg",
            childrenItems: [],
        },
        {
            elementNo: 8,
            title: "پشتیبانی",
            icon: "/assets/drawer/deactive/support_agent-24px.svg",
            activeIcon: "/assets/drawer/active/support_agent-24px.svg",
            link: "/tickets",
            spanDown: "/assets/drawer/deactive/dashboard-24px.svg",
            spanDownActive: "/assets/drawer/active/dashboard-24px.svg",
            childrenItems: [],
        },
        {
            elementNo: 9,
            title: "مدیریت سطوح",
            icon: "/assets/drawer/deactive/emoji_events-24px.svg",
            activeIcon: "/assets/drawer/active/emoji_events-24px.svg",
            link: "/levelmanage",
            spanDown: "/assets/drawer/deactive/dashboard-24px.svg",
            spanDownActive: "/assets/drawer/active/dashboard-24px.svg",
            childrenItems: [],
        },
        {
            elementNo: 10,
            title: "مدیریت امتیازها",
            icon: "/assets/drawer/deactive/grade-24px.svg",
            activeIcon: "/assets/drawer/active/grade-24px.svg",
            link: "/points",
            spanDown: "/assets/drawer/deactive/dashboard-24px.svg",
            spanDownActive: "/assets/drawer/active/dashboard-24px.svg",
            childrenItems: [],
        },
        {
            elementNo: 11,
            title: "تنظیمات بازار",
            icon: "/assets/drawer/deactive/settings-deactivepx.svg",
            activeIcon: "/assets/drawer/active/settings-24px.svg",
            link: "/marketsetting",
            spanDown: "/assets/drawer/deactive/dashboard-24px.svg",
            spanDownActive: "/assets/drawer/active/dashboard-24px.svg",
            childrenItems: [],
        },
        {
            elementNo: 12,
            title: "مدیریت نقش‌ها",
            icon: "/assets/drawer/deactive/settings-deactivepx.svg",
            activeIcon: "/assets/drawer/active/settings-24px.svg",
            link: "/rolemanage",
            spanDown: "/assets/drawer/deactive/dashboard-24px.svg",
            spanDownActive: "/assets/drawer/active/dashboard-24px.svg",
            childrenItems: [],
        },

    ]

    const [childsActive, setChildsActive] = React.useState(null);

    const history = useHistory();
    const location = useLocation()

    return (
        <div className="sidebar">
            <div className="sidebarBrand"></div>
            <ul className="sidebarList">
                {SideBarData.map((value, key) => {
                    return (
                        <>
                            <li
                                key={key}
                                className="row"
                                id={location.pathname.startsWith(value.link) ? "active" : ""}
                                onClick={() => {
                                    if (value.childrenItems.length) {
                                        console.log("thats true", key)
                                        setChildsActive(value.elementNo)
                                    } else {
                                        setChildsActive(null)
                                        history.push(value.link)
                                    }
                                }}
                            >
                                {location.pathname.startsWith(value.link) ?
                                    (<img id="icon" src={value.activeIcon} />) :
                                    (<img id="icon" src={value.icon} />)
                                }
                                <div id="title">{value.title}</div>
                                {location.pathname.startsWith(value.link) ?
                                    (<img id="spanDown" style={{ transform: value.childrenItems.length ? "rotate(-90deg)" : "" }} src={value.spanDownActive} />) :
                                    (<img id="spanDown" src={value.spanDown} />)
                                }
                            </li>
                            {
                                childsActive === key && value.childrenItems.map((item, index) => {
                                    return (
                                        <li
                                            key={`${key}${index}`}
                                            className="row"
                                            id={location.pathname.startsWith(item.link) ? "active" : ""}
                                            onClick={() => {
                                                history.push(item.link)
                                            }}
                                        >
                                            <div id="title" className="me-5 pe-4">{item.title}</div>
                                        </li>
                                    )
                                })
                            }
                        </>
                    )
                })}
            </ul>
        </div>
    );
}

export default SideBar;
