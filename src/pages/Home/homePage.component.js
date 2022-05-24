import React, { useEffect, useState } from "react";
import './homePage.style.scss'
import icon from '../../assets/icon.png'
import entriesIcon from "../../assets/entries_icon.png"
import operatorsIcon from "../../assets/operators_icon.png"
import logoutIcon from "../../assets/logout_icon.png"
import dashboardIcon from "../../assets/dashboard_icon.png"
import entriesIconSelected from "../../assets/entries_icon_selected.png"
import operatorsIconSelected from "../../assets/operators_icon_selected.png"
import logoutIconSelected from "../../assets/logout_icon_selected.png"
import dashboardIconSelected from "../../assets/dashboard_icon_selected.png"
import Operators from "../../components/Operators/operators.component";
import Entries from "../../components/Entries/entries.component";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { firebaseAuth } from "../../backend/firebaseHandler";
import Dashboard from "../../components/Dashboard/dashboard.component";
import queryString from 'query-string'
import { useSearchParams } from "react-router-dom";

const HomePage = (props) => {

    const [selectedItem, setSelectedItem] = useState("DASHBOARD")
    const [dialogVisibility, setDialogVisibility] = useState(false);
    const [params, setSearchParams] = useSearchParams();
    

    useEffect(()=>{
        if (params.get('tab')) {
            setSelectedItem(params.get('tab'))
        }else {
            setSearchParams({tab:"DASHBOARD"})
        }
    }, [params])

    const handleChange = (value) => {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?tab='+value;
        window.history.replaceState({path:newurl},'',newurl);
    }

    return(
        <div className="home-container">
            <div className="sidebar-container">
                <img src={icon} alt="estimation-tool" className="icon" />

                <div className="menu-item-container" onClick={()=>{setSelectedItem("DASHBOARD"); handleChange("DASHBOARD")}} style={selectedItem==="DASHBOARD"?{backgroundColor:"white", marginLeft:20, borderTopLeftRadius:10, borderBottomLeftRadius:10}:{backgroundColor:"#F1F6F7"}}>
                    <img className="menu-item-icon" src={selectedItem==="DASHBOARD"?dashboardIconSelected:dashboardIcon} alt="estimation-tool" />
                    <p style={selectedItem==="DASHBOARD"?{color:"#FE5C1C"}:{color:"#444"}} className="menu-item-label">Dashboard</p>
                </div>
                <div className="menu-item-container" onClick={()=>{setSelectedItem("ENTRIES"); handleChange("ENTRIES")}} style={selectedItem==="ENTRIES"?{backgroundColor:"white", marginLeft:20, borderTopLeftRadius:10, borderBottomLeftRadius:10}:{backgroundColor:"#F1F6F7"}}>
                    <img className="menu-item-icon" src={selectedItem==="ENTRIES"?entriesIconSelected:entriesIcon} alt="estimation-tool" />
                    <p style={selectedItem==="ENTRIES"?{color:"#FE5C1C"}:{color:"#444"}} className="menu-item-label">Entries</p>
                </div>
                <div className="menu-item-container" onClick={()=>{setSelectedItem("OPERATORS"); handleChange("OPERATORS")}} style={selectedItem==="OPERATORS"?{backgroundColor:"white", marginLeft:20, borderTopLeftRadius:10, borderBottomLeftRadius:10}:{backgroundColor:"#F1F6F7"}}>
                    <img className="menu-item-icon"  src={selectedItem==="OPERATORS"?operatorsIconSelected:operatorsIcon} alt="estimation-tool" />
                    <p style={selectedItem==="OPERATORS"?{color:"#FE5C1C"}:{color:"#444"}} className="menu-item-label">Operators</p>
                </div>
                <div className="menu-item-container" onClick={()=>{setDialogVisibility(true)}} style={selectedItem==="LOGOUT"?{backgroundColor:"white", marginLeft:20, borderTopLeftRadius:10, borderBottomLeftRadius:10}:{backgroundColor:"#F1F6F7"}}>
                    <img className="menu-item-icon"  src={selectedItem==="LOGOUT"?logoutIconSelected:logoutIcon} alt="estimation-tool" />
                    <p style={selectedItem==="LOGOUT"?{color:"#FE5C1C"}:{color:"#444"}} className="menu-item-label">Logout</p>
                </div>
            </div>

            <div className="content-container">
                {
                    selectedItem === "DASHBOARD"
                    ?
                    <Dashboard />
                    :
                    null
                }
                {
                    selectedItem === "ENTRIES"
                    &&
                    <Entries />
                }
                {
                    selectedItem === "OPERATORS"
                    &&
                    <Operators />
                }
            </div>

            <Dialog open={dialogVisibility} onClose={()=>{setDialogVisibility(false)}} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">              
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Are you sure you want to logout?</DialogContentText>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={()=>{setDialogVisibility(false)}}>Cancel</Button>
                    <Button onClick={()=>{firebaseAuth.signOut()}}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default HomePage