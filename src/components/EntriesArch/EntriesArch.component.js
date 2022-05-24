import { Divider } from "@mui/material";
import React from "react";
import './EntriesArch.styles.scss';
import { AiOutlineClockCircle, AiOutlineCalendar, } from 'react-icons/ai'
import { BiPound } from 'react-icons/bi';
import { Link, useNavigate } from "react-router-dom";

const EntriesArch = ({ item }) => {
  
    const navigate = useNavigate()

    return (
        <div className="entries-arch-container" onClick={()=>{navigate("/sample", {state:{item:item.key}})}}>
            <h3 className="entries-arch-name">{item.projectName}</h3>
            <p className="entries-arch-description">{item.projectDescription}</p>
            <Divider />
            <div className="entries-arch-details-stamps-list">
                <div className="entries-arch-details-stamps">
                    <AiOutlineCalendar size={16} />
                    <span className="entries-arch-details-stamps-value" >{parseFloat(item.estimatedTime.days).toLocaleString('en-IN')} Days</span>
                </div>
                <div className="entries-arch-details-stamps">
                    <BiPound size={16} />
                    <span className="entries-arch-details-stamps-value" >{parseFloat(item.estimatedTotalCost).toLocaleString('en-IN')} GBP</span>
                </div>
            </div> 
            <span className="entries-arch-timestamp">{item.date}, {item.time}</span>
        </div>
        
    )
}

export default EntriesArch;