import React, { useContext } from "react";
import { ThemeContext } from "./Contexts";
import img from "./images/imgFooter.PNG";

const Footer = () => {
    const color = useContext(ThemeContext);

    return (
        <div  className={color.colorValue === "black" ? "white" : "black"} >
            <img src={img} alt="Footer" style={{marginTop:"70px" ,width:"100%"}}/>
            <div style={{textAlign:"center"}}> © 2023 אסתי וציפי</div>
        </div>
    )
}

export default Footer;
