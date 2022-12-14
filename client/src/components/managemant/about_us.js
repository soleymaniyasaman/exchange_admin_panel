import React, { ReactDOM } from "react";
import CKEditor from "./classicEditor";
import { IAM_APP , TERMS_AND_CONDITIONS_ITEM , TERMS_AND_CONDITIONS_UPDATE} from '../../utils/constants';
import { useFetchApi } from '../../utils/hooks';
import {  Container, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Button } from '@material-ui/core';


const ConfirmModal = (props) => {

  return <Dialog
    maxWidth="xs"
  //   onEntering={handleEntering}
    aria-labelledby="confirmation-dialog-title"
    open={props.openModal}
  >
      <DialogTitle id="confirmation-dialog-title">آیا از تغییر متن مطمئن هستید؟</DialogTitle>
      <DialogContent >

      </DialogContent>
      <DialogActions>
          <Button autoFocus onClick={ () => props.setOpenModal(false)} variant="outlined" color="secondary">
              خیر
          </Button>
          <Button onClick={ () => {
              props.handleUserApprove()
              setTimeout( () => {props.setOpenModal(false)} , 2000 )
          }} variant="contained" color="primary">
              بله
          </Button>
      </DialogActions>
  </Dialog>
}


const AboutUs = () => {

  const [content, setContent] = React.useState();
  const [openModal, setOpenModal] = React.useState(false);   
  const [{ data: aboutUs, isLoading: aboutUsLoading },doFetch] = useFetchApi(undefined)
  const [{ data: aboutUsUpdate, isLoading: aboutUsUpdateLoading }, getAboutUs] = useFetchApi(undefined, {})
  
  //------ Test for race condition ------ //
  const setContents =() =>{
    console.log("Setting content",typeof content);
  }

  const onChange =(evt) => {
    setContent(evt.editor.getData())
    // console.log("onChange fired with event info: ",evt, "and data: ",evt.editor.getData());
    // console.log("and data: ",evt.editor.getData());
  }

  // const onBlur =(evt) => {
  // }

  // const afterPaste =(evt) => {
  // }
  console.log("content",content)
  async function handleSave() {
    console.log("Setting content",content);

    const payload = {
        "key": "string",
        "value": content,
        "additional_data":{}
      
      }
    getAboutUs("PUT", IAM_APP, TERMS_AND_CONDITIONS_UPDATE(11),payload)
   }



   React.useEffect( () => {
    doFetch("GET", IAM_APP, TERMS_AND_CONDITIONS_ITEM(11) )
}, [])
    return (
        <div className="content">
        <ConfirmModal openModal={openModal} setOpenModal={setOpenModal} handleUserApprove={handleSave} />
        <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">
        <div className="d-flex">
            <img src="/assets/drawer/Polygon.svg" />
            <p className="font_title_name me-1" style={{minWidth: "150px"}}>صفحه درباره ما</p>
        </div>
        </div>
        <CKEditor
          content={content?content:aboutUs?.value}
          activeClass="mt-4"
          
          events={{
            // blur: onBlur,
            // afterPaste: afterPaste,
            change: onChange
          }}
        />
          <div className="d-flex justify-content-end mt-3 ps-5">
          <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            setOpenModal(true)
            // handleSave()
            }}>ثبت اطلاعات</Button>
          </div>
      </div>
    );
  
}

export default AboutUs;