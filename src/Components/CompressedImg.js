import React from "react";

const CompressedImage=(props)=>{
    return(
    <div className="flex justify-center my-4">
        <img src={props.source} alt="compImg" className="w-10/12"/>
    </div>
        
    )
}

export default CompressedImage;