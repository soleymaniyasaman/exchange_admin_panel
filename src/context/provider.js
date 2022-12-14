import React, { createContext, useState } from 'react';

import { RefreshToken } from '../utils/utils';



export const UserContext = createContext();

const MyProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(RefreshToken()))

    const [tableData, setTableData] = useState([]);

    const [brands, setBrands] = useState([])

    const [id, setId] = useState("Product")

    const [name, setName] = useState("productList")

    const [editData, setEditData] = useState("")

    const [selected, setSelected] = useState("userInfoForm")

    const [editClicked, setEditClicked] = useState(false)

    const [addClicked, setAddClicked] = useState(false)

    const [formRefValues, setFormRefValues] = useState()

    const [toggle, setToggle] = useState(false)

    const [showModal, setShowModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [indexModal, setIndexModal] = useState()

    const [itemModal, setItemModal] = useState()

    const [imageData, setImageData] = useState([])

    const [gallery, setGallery] = useState([])

    const [video, setVideo] = useState([])

    const [imagePhone, setImagePhone] = useState([])

    const [source, setSource] = useState([]);

    const [profileImage, setProfileImage] = useState([])

    const [isBlocking, setIsBlocking] = useState(false)

    const [showAlert, setShowAlert] = useState(false)

    const [contextRowIndex, setContextRowIndex] = useState()

    const [cameraData, setCameraData] = useState([]);

    const [boxData, setBoxData] = useState([])

    const [isTouched, setIsTouched] = useState(false)

    const [depositFilter, setDepositFilter] = useState();

    const [withdrawFilter, setWithdrawFilter] = useState();

    const [configData, setConfigData] = useState();

    const [rejectMessage, setRejectMessage] = useState();

    const [priceUpdate, setPriceUpdate] = useState();
    const [usdtIrr, setUsdtIrr] = useState();

    return (

        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn,priceUpdate, setPriceUpdate , usdtIrr, setUsdtIrr ,rejectMessage, setRejectMessage, isTouched, setIsTouched, boxData, setBoxData, tableData, setTableData, brands, setBrands, id, setId, name, setName, editData, setEditData, selected, setSelected, editClicked, setEditClicked, addClicked, setAddClicked, formRefValues, setFormRefValues, toggle, setToggle, imageData, setImageData, gallery, setGallery, video, setVideo, imagePhone, setImagePhone, showModal, setShowModal, showEditModal, setShowEditModal, source, setSource, profileImage, setProfileImage, indexModal, setIndexModal, itemModal, setItemModal, isBlocking, setIsBlocking, showAlert, setShowAlert, contextRowIndex, setContextRowIndex, cameraData, setCameraData ,depositFilter, setDepositFilter ,withdrawFilter, setWithdrawFilter, configData, setConfigData}}>

            {children}

        </UserContext.Provider>

    );

}



export default MyProvider;

