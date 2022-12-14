import axios from 'axios';

import { useContext, useEffect } from 'react';

import { UserContext } from '../context/provider';

import { BASE_CONFIG_URL , EXCHANGE_CONFIG , CONFIG_COINS} from './constants';




//config api call

const ConfigApi = (props) => {

    const dataContext = useContext(UserContext);

    const configData = () => {

        const configUrl = `${BASE_CONFIG_URL}${EXCHANGE_CONFIG}${CONFIG_COINS}`

        console.log("config url ",configUrl)

        axios.get(configUrl)

            .then(resp => {

                resp.data.map(item => {
                    let values = ''

                    if (item.Value) {
        
                        const encodedRequestBody = String(item.Value);
        
                        const decodedRequestBodyString = Buffer.from(encodedRequestBody, "base64");
        
                        values = JSON.parse(decodedRequestBodyString);
        
                    }
        
                    item.Value = values

                    return item
        
                })

                dataContext.setConfigData(resp.data);

            })

    }




    useEffect(() => {

        configData();

    }, []);


    return null;

}



export default ConfigApi;

