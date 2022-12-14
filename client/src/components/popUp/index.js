import {React , useContext, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { UserContext } from '../../context/provider';
import './alert.scss'
// import'../layout/styles.scss'
const PopUp = (props) => {
  const contextData = useContext(UserContext);

    // useEffect(() => {
    //   window.addEventListener('beforeunload', alertUser)
    // //   window.addEventListener('unload', handleEndConcert)
    //   return () => {
    //     window.removeEventListener('beforeunload', alertUser)
    //     // window.removeEventListener('unload', handleEndConcert)
    //     // handleEndConcert()
    //   }
    // }, [])
    // const alertUser = e => {
    //   e.preventDefault()
    //   e.returnValue = ''
    // }
    // const handleEndConcert = async () => {
    //   await fetch({
    //     url: endConcert(concert.id),
    //     method: 'PUT'
    //   })
    // }
    return (
      <Modal show={contextData.showAlert} onHide={() => contextData.setShowAlert(false)} >
        <Modal.Header className="popUpHeader" closeButton closeLabel="">
          <Modal.Title className="small">
          <div className=" d-flex align-items-center w-auto mx-auto flex-row-reverse">
                    <img src="/assets/drawer/Polygon.svg" />
                    <p className="me-1 m-0 text-white"> {props.popUpHead} </p>
                </div>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="popUpBody">{props.popUpBody}</Modal.Body>
        <Modal.Footer className="popUpFooter">
          <Button variant="secondary" onClick={props.onCancel} className="popUpBody popUpButton">
            {props.onCancelText}
          </Button>
          <Button variant="primary" onClick={props.onAccept} className="popUpBody popUpButton">
            {props.onAcceptText}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  export default PopUp;