import { useContext, useEffect } from 'react';

import { UserContext } from '../context/provider';

// import { ORDER_CREATE, ORDER_DELETE, ORDER_UPDATE, PRICE_UPDATE, TRADE_CREATE } from '../pages/dashboard/exchange/constants';

// import { ACCOUNTING_APP, BASE_URL, TRADING_APP } from '../utils/constants';

// import service from './service';



//wallet api call

const WalletApi = (props) => {

    const contextData = useContext(UserContext);


    let ws = null;

    // const walletData = () => {

    //     const walletDataUrl = `${BASE_URL(ACCOUNTING_APP)}/wallet/`

    //     service.get_api(walletDataUrl)

    //         .then(resp => {

    //             let data = resp.data.result

    //             data?.map((item, index) => {

    //                 if (item.c_type === "irr") {

    //                     contextData.setWalletIrrCash(item.quantity);

    //                 }

    //             }

    //             )

    //             data?.forEach(v => { v.price = null; v.priceUsdtIrr = 0 });

    //             contextData.setWallet(data);

    //         })

    // }

    //add price to wallet

    const walletUpdate = () => {

        props.walletData?.map((item, index) => {

            let price = null

            let irr

            if (contextData.priceUpdate) {
                
                price = contextData.priceUpdate.filter(itm => itm.symbol === item.c_type)
                
                irr = contextData.priceUpdate.filter(itm => itm.symbol === "USDIRR")
                
                // contextData.setToggleWalletPrice(true)
                
            }
            return item.price = item.c_type === "irr" ? irr : price

        })

    }

    //add irr price to wallet

    const walletUpdatePrice = () => {

        props.walletData?.map((item, index) => {

            let priceValues = null

            if (item.price && contextData.usdtIrr) {

                priceValues = item.c_type === "irr" ? item.quantity : item.quantity * (item.price[0] ? item.price[0].current_price : 0) * contextData.usdtIrr.current_price

                // contextData.setToggleWaletIrrValue(true)

            }

            // console.log("pricevalue",priceValue)

            return item.priceUsdtIrr = priceValues

        })

    }

    //socket call

    const runSocket = () => {

        ws = new WebSocket("wss://websocket.mojex.devmoj.ir/api/v1/");

        ws.onopen = props.onopen;

        ws.onmessage = (message) => {

            let msgdata = JSON.parse(message.data);

            switch (msgdata.type) {

                case "price_update":
                    // console.log("price update",msgdata.data)
                    contextData.setPriceUpdate(msgdata.data);

                    let map = new Map();

                    let data = msgdata.data;

                    data.forEach(item => {

                        map.set(item.symbol, item)

                        let irr = map.get("USDIRR")

                        return contextData.setUsdtIrr(irr)

                    });

                    break;

                default:

                    break;

            }

        };

    }

    // useEffect(() => {

    //     walletData();



    // }, []);

    useEffect(() => {

        walletUpdate()

    }, [props.walletData, contextData.priceUpdate, contextData.usdtIrr]);



    useEffect(() => {

        walletUpdatePrice()

    // }, [contextData.wallet, contextData.toggleWalletPrice, contextData.usdtIrr]);
    }, [props.walletData, contextData.usdtIrr]);



    useEffect(() => {

        runSocket();

        return () => {

            ws = null;

        };

    }, []);

    return null;

}



export default WalletApi;

