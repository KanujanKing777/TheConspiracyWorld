import React from "react";

function Notification({data}){
    return (
        <div style={{
            
                display :"none",
                position :"fixed",
                top:"5%",
                left :"50%",
                color :"white", 
                height :"max-content",
                background :"linear-gradient(109.6deg, #006400 11.2%, #006400 91.7%)",   
                padding :"2%",
                borderRadius :"5px",
                paddingTop :"1vh",
                paddingBottom :"1vh",
               boxShadow :"0px 0px 10px rgba(0, 0, 0, 0.7)",
              
        }} id="notification" class="notification">
            {data}
        </div>
    );
}

export default Notification;