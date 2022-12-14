import React, { useState, useEffect, useReducer } from "react";
import { api } from "./api";
import {Snackbar } from '@material-ui/core';
import { BASE_URL } from "./constants";


const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
          return { 
              ...state,
              isLoading: true,
              hasError: false
            };
        case 'FETCH_SUCCESS':
          return { 
              ...state,
              isLoading: false,
              hasError: false,
              data: action.payload,
            };
        case 'FETCH_FAILURE':
          return { 
              ...state,
              isLoading: false,
              hasError: true,
            };
        default:
          throw new Error();
      }
  };


export const useFetchApi = (initialConf, initialData) => {

    
    const [configs, setConfigs] = useState(initialConf);
    
    const createApiConfigs = (method, baseUrl, url, data) => setConfigs(
        {
            method,
            baseURL: !baseUrl.startsWith("http") ? BASE_URL(baseUrl) : baseUrl,
            url,
            data,
        }
    )

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        hasError: false,
        data: initialData,
        listCount: 0
    });

    useEffect(() => {
        let didCancel = false;
        if (configs){
            const fetchData = async () => {
                dispatch({ type: 'FETCH_INIT' });
                try {
                    const result = await api(configs);
                    if (!didCancel){
                        if (result.data.message === "ok"){
                            dispatch({ type: 'FETCH_SUCCESS', payload: result.data.result });
                        }
                    }
                } catch (error) {
                    if (!didCancel) {
                        dispatch({ type: 'FETCH_FAILURE' });
                    }
                }
            }
            fetchData();
        };
        return () => {
            didCancel = true;
        };

    }, [configs]);
   
    return [state, createApiConfigs];
  };


  export const useSnackbar = (message, duration, type) => {
    const [snackOpen, setSnackOpen] = useState(false)
    return <Snackbar
            // anchorOrigin={{ vertical, horizontal }}
            open={snackOpen}
            onClose={ () => setSnackOpen(false) }
            message="خطایی رخ داده است"
            autoHideDuration={1000}
            // key={vertical + horizontal}
        />
  }
