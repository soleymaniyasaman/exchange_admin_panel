import React, { useContext } from "react";
import { UserContext } from '../../../../context/provider';
import { Field } from "formik";
import Wizard from "./Wizard";
// import Processors from "./adminPanel_products_processorsForm";
// import Display from "./adminPanel_products_display";
// import Network from "./adminPanel_product_network";
// import "react-datepicker/dist/react-datepicker.css";
// import FirstInformation from "./adminPanel_products_firsInformation";
// import Software from "./adminPanel_product_software";
// import Sound from "./adminPanel_product_sound";
// import Battery from "./adminPanel_product_battery";
// import Box from "./adminPanel_products_box/index";
// import Camera from "./adminPanel_product_camera";
// import Image from "./adminPanel_product_images";
// import Materials from "./adminPanel_product_materials";
import { useLocation, withRouter } from "react-router-dom";
import UserInfoForm from "./userInfoForm";
import UserOrdersDataGrid from "../userOrders";
import UserTradesDataGrid from "../userTrades";
import UserTransactionHistoryDataGrid from "../userTransactionHistory";
import UserWithdrawsDataGrid from "../userWithdraws";
import UserWalletsDataGrid from "../userWallets";
import UserLoginActivity from "../userLoginActivity";
// import Pricable from "./adminPanel_product_pricable";

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const required = (value) => (value ? undefined : "Required");

const Error = ({ name }) => (
  <Field
    name={name}
    render={({ form: { touched, errors } }) =>
      touched[name] && errors[name] ? <span>{errors[name]}</span> : null
    }
  />
);

const Form = ({ history }) => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  var index;
  var query = useQuery();
  index = query.get("index")
  //   console.log(`query:${index}`);

  const data = useContext(UserContext);

  return (
    <div className="">
      <Wizard
        initialValues={{
          isSaveButton: false,
          isAuthentication: (index || index === 0) ? data.tableData[index].isAuthentication : "",
          //process
          processmodel: (index || index === 0) ? data.tableData[index].processmodel : "",
          process: (index || index === 0) ? data.tableData[index].process : "",
          processtype: (index || index === 0) ? data.tableData[index].processtype : "",
          frequenceprocess: (index || index === 0) ? data.tableData[index].frequenceprocess : "",
          prosens: (index || index === 0) ? data.tableData[index].prosens : "",
          graffprocessKind: (index || index === 0) ? data.tableData[index].graffprocessKind : "",
          ram: (index || index === 0) ? data.tableData[index].ram : "",
          ramKind: (index || index === 0) ? data.tableData[index].ramKind : "",
          storage: (index || index === 0) ? data.tableData[index].storage : "",
          storageKind: (index || index === 0) ? data.tableData[index].storageKind : "",
          memorycheck: (index || index === 0) ? data.tableData[index].memorycheck : "",
          fingersens: (index || index === 0) ? data.tableData[index].fingersens : "",
          lightsens: (index || index === 0) ? data.tableData[index].lightsens : "",
          proxisens: (index || index === 0) ? data.tableData[index].proxisens : "",
          speedsens: (index || index === 0) ? data.tableData[index].speedsens : "",
          compasssens: (index || index === 0) ? data.tableData[index].compasssens : "",
          gyroscopesens: (index || index === 0) ? data.tableData[index].gyroscopesens : "",
          //display
          screenSize: (index || index === 0) ? data.tableData[index].screenSize : "",
          screenType: (index || index === 0) ? data.tableData[index].screenType : "",
          displayDetails: (index || index === 0) ? data.tableData[index].displayDetails : "",
          aspectRatio: (index || index === 0) ? data.tableData[index].aspectRatio : "",
          density: (index || index === 0) ? data.tableData[index].density : "",
          resolution: (index || index === 0) ? data.tableData[index].resolution : "",
          resolutiontype: (index || index === 0) ? data.tableData[index].resolutiontype : "",
          displayMoreDetails: (index || index === 0) ? data.tableData[index].displayMoreDetails : "",
          //network
          charger: (index || index === 0) ? data.tableData[index].charger : "",
          otg: (index || index === 0) ? data.tableData[index].otg : "",
          typeC: (index || index === 0) ? data.tableData[index].typeC : "",
          massStorage: (index || index === 0) ? data.tableData[index].massStorage : "",
          bluetoothversion: (index || index === 0) ? data.tableData[index].bluetoothversion : "",
          profile: (index || index === 0) ? data.tableData[index].profile : "",
          supports: (index || index === 0) ? data.tableData[index].supports : "",
          simNumber: (index || index === 0) ? data.tableData[index].simNumber : "",
          simType: (index || index === 0) ? data.tableData[index].simType : "",
          network: (index || index === 0) ? data.tableData[index].network : "",
          storage2g: (index || index === 0) ? data.tableData[index].storage2g : "",
          storage3g: (index || index === 0) ? data.tableData[index].storage3g : "",
          storage4g: (index || index === 0) ? data.tableData[index].storage4g : "",
          storage5g: (index || index === 0) ? data.tableData[index].storage5g : "",
          storage6g: (index || index === 0) ? data.tableData[index].storage6g : "",
          wifiStandard: (index || index === 0) ? data.tableData[index].wifiStandard : "",
          checkwifidualband: (index || index === 0) ? data.tableData[index].checkwifidualband : "",
          checkwifihotspot: (index || index === 0) ? data.tableData[index].checkwifihotspot : "",
          checkwifidirect: (index || index === 0) ? data.tableData[index].checkwifidirect : "",
          checkwifidisplay: (index || index === 0) ? data.tableData[index].checkwifidisplay : "",
          checkwifimimo: (index || index === 0) ? data.tableData[index].checkwifimimo : "",
          checknfcsens: (index || index === 0) ? data.tableData[index].checknfcsens : "",
          check35sens: (index || index === 0) ? data.tableData[index].check35sens : "",
          checkradiosens: (index || index === 0) ? data.tableData[index].checkradiosens : "",
          checkcomputersyncsens: (index || index === 0) ? data.tableData[index].checkcomputersyncsens : "",
          checkotgsens: (index || index === 0) ? data.tableData[index].checkotgsens : "",
          checkinfraredsens: (index || index === 0) ? data.tableData[index].checkinfraredsens : "",
          checktetheringsens: (index || index === 0) ? data.tableData[index].checktetheringsens : "",
          checkvoltesens: (index || index === 0) ? data.tableData[index].checkvoltesens : "",
          checkvowifisens: (index || index === 0) ? data.tableData[index].checkvowifisens : "",
          //af code start
          //first information
          userEmail: (index || index === 0) ? data.tableData[index].userEmail : "",
          firstName: (index || index === 0) ? data.tableData[index].firstName : "",
          lastName: (index || index === 0) ? data.tableData[index].lastName : "",
          identifyCode: (index || index === 0) ? data.tableData[index].identifyCode : "",
          birthDay: (index || index === 0) ? data.tableData[index].birthDay : "",
          phoneNum: (index || index === 0) ? data.tableData[index].phoneNum : "",
          mobileNum: (index || index === 0) ? data.tableData[index].mobileNum : "",
          address: (index || index === 0) ? data.tableData[index].address : "",
          cardNum: (index || index === 0) ? data.tableData[index].cardNum : "",
          shabaNum: (index || index === 0) ? data.tableData[index].shabaNum : "",
          //battery
          batteryCapacity: (index || index === 0) ? data.tableData[index].batteryCapacity : "",
          batteryType: (index || index === 0) ? data.tableData[index].batteryType : "",
          fastCharge: (index || index === 0) ? data.tableData[index].fastCharge : "",
          chargingPower: (index || index === 0) ? data.tableData[index].chargingPower : "",
          removable: (index || index === 0) ? data.tableData[index].removable : "",
          reverseCharging: (index || index === 0) ? data.tableData[index].reverseCharging : "",
          moreDetails: (index || index === 0) ? data.tableData[index].moreDetails : "",
          //image 3d imageID
          idproduct: (index || index === 0) ? data.tableData[index].idproduct : "",
          //images
          imagePhone: (index || index === 0) ? data.tableData[index].imagePhone : "",
          gallery: (index || index === 0) ? data.tableData[index].gallery : "",
          imageData: (index || index === 0) ? data.tableData[index].imageData : "",
          file: (index || index === 0) ? data.tableData[index].file : "",
          source: (index || index === 0) ? data.tableData[index].source : "",
          //materials
          Width: (index || index === 0) ? data.tableData[index].Width : "",
          length: (index || index === 0) ? data.tableData[index].length : "",
          Thickness: (index || index === 0) ? data.tableData[index].Thickness : "",
          Weight: (index || index === 0) ? data.tableData[index].Weight : "",
          BodyMaterial: (index || index === 0) ? data.tableData[index].BodyMaterial : "",
          CertificatesOfResistance: (index || index === 0) ? data.tableData[index].CertificatesOfResistance : "",
          color: (index || index === 0) ? data.tableData[index].color : "",
          //software
          startDate: (index || index === 0) ? data.tableData[index].startDate : "",
          operatingSystem: (index || index === 0) ? data.tableData[index].operatingSystem : "",
          operatingSystemVersion: (index || index === 0) ? data.tableData[index].operatingSystemVersion : "",
          googleService: (index || index === 0) ? data.tableData[index].googleService : "",
          manufacturerSoftware: (index || index === 0) ? data.tableData[index].manufacturerSoftware : "",
          //sound
          numberOfSpeakers: (index || index === 0) ? data.tableData[index].numberOfSpeakers : "",
          dolby: (index || index === 0) ? data.tableData[index].dolby : "",
          noiseCancellation: (index || index === 0) ? data.tableData[index].noiseCancellation : "",
          audio: (index || index === 0) ? data.tableData[index].audio : "",
          stereoSpeakers: (index || index === 0) ? data.tableData[index].stereoSpeakers : "",
          moreDetailsSound: (index || index === 0) ? data.tableData[index].moreDetailsSound : "",
          title: (index || index === 0) ? data.tableData[index].title0 : "",

          //camera firstitem

          // //camera secondtitem

          //selfi camera
          resolution_selfi: (index || index === 0) ? data.tableData[index].resolution_selfi : "",
          Sensor_selfi: (index || index === 0) ? data.tableData[index].Sensor_selfi : "",
          Type_selfi: (index || index === 0) ? data.tableData[index].Type_selfi : "",
          Aperture_selfi: (index || index === 0) ? data.tableData[index].Aperture_selfi : "",
          ISO_selfi: (index || index === 0) ? data.tableData[index].ISO_selfi : "",
          PixelSize_selfi: (index || index === 0) ? data.tableData[index].PixelSize_selfi : "",
          SensorSize_selfi: (index || index === 0) ? data.tableData[index].SensorSize_selfi : "",
          //otherData in camera
          flashType: (index || index === 0) ? data.tableData[index].flashType : "",
          opticalStabilization: (index || index === 0) ? data.tableData[index].opticalStabilization : "",
          slowMotionVideoPart: (index || index === 0) ? data.tableData[index].slowMotionVideoPart : "",
          slowMotionVideo: (index || index === 0) ? data.tableData[index].slowMotionVideo : "",
          possibilities: (index || index === 0) ? data.tableData[index].possibilities : "",
          additionalFeatures: (index || index === 0) ? data.tableData[index].additionalFeatures : "",
          otherFacilities: (index || index === 0) ? data.tableData[index].otherFacilities : "",
          cameraData: (index || index === 0) ? data.tableData[index].cameraData : "",
          boxData: (index || index === 0) ? data.tableData[index].boxData : "",
        }}
        onSubmit={({ values, save, isAuth }) => {
          if (save) {
            // console.log(`bag :${save}`)
            if (index || index === 0) {
              var ix = index;
              data.tableData[ix] = values;
              data.setBoxData([]);
              data.setImageData([]);
              // console.log(values)
              history.push('/users');
            } else {
              data.setTableData([
                ...data.tableData,
                values
              ]);
              data.setBoxData([]);
              data.setImageData([]);
              history.push('/users');
            }
          }
          if (isAuth) {
            // console.log(`not bag:${upload}`);
            history.push('/users');

          }
        }
        }
      >
        {data.selected === "userInfoForm" ?
          <Wizard.Page>
            {props => <UserInfoForm Error={Error} required={required} props={props} />}
          </Wizard.Page>
          : null
        }
        {data.selected === "wallet" ?
          <Wizard.Page>
            {(props) => <UserWalletsDataGrid Error={Error} required={required} props={props} />}
          </Wizard.Page>
          : null
        }
        {data.selected === "permit" ?
          <Wizard.Page>
            {(props) => <UserWithdrawsDataGrid Error={Error} required={required} props={props} />}
          </Wizard.Page>
          : null
        }
        {data.selected === "order" ?
          <Wizard.Page>
            {(props) => <UserOrdersDataGrid Error={Error} required={required} props={props} />}
          </Wizard.Page>
          : null
        }
        {data.selected === "treatHistory" ?
          <Wizard.Page>
            {(props) => <UserTradesDataGrid Error={Error} required={required} props={props} />}
          </Wizard.Page>
          : null
        }
        {data.selected === "transAction" ?
          <Wizard.Page>
            {(props) => <UserTransactionHistoryDataGrid Error={Error} required={required} props={props} />}
          </Wizard.Page>
          : null
        }
        {data.selected === "concession" ?
          <Wizard.Page>
            {/* {() => <Battery Error={Error} required={required} />} */}
          </Wizard.Page>
          : null
        }
        {data.selected === "loginHistory" ?
          <Wizard.Page>
            {(props) => <UserLoginActivity Error={Error} required={required} props={props} />}
          </Wizard.Page>
          : null
        }

      </Wizard>
    </div>
  );
}

export default withRouter(Form);
