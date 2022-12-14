import React from 'react'



function AlternateLayout(props) {

    return (

        <div style={{ direction: "rtl", backgroundColor: "#181C1F" }}>

            {props.children}

        </div>

    )

}



export default AlternateLayout

