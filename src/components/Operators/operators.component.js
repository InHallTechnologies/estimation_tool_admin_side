import React, { useEffect, useState } from "react";
import './operators.style.scss'
import searchIcon from '../../assets/search_icon.png'
import crossIcon from '../../assets/close_icon.png'
import { Alert, Button, Snackbar, Table } from "@mui/material";
import { child, get, ref, set } from "firebase/database";
import { firebaseDatabase } from "../../backend/firebaseHandler";
import { useNavigate } from "react-router-dom";

const Operators = () => {

    const [searchWord, setSearchWord] = useState("")
    const [selected, setSelected] = useState("ACTIVE")
    const [originalList, setOriginalList] = useState([])
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [actionType, setActionType] = useState("")
    const [actionTypeTwo, setActionTypeTwo] = useState("")
    const [message, setMessage] = useState("")
    const [visibility, setVisibility] = useState(false)
    const [severityType, setSeverity] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        let temp = []
        let tempActive = []

        setActionType("Entries")
        setActionTypeTwo("Disable")

        get(child(ref(firebaseDatabase), "USER_ARCHIVE")).then((snap) => {
            if (snap.exists()) {
                for (const key in snap.val()) {
                    if (snap.child(key).child("status").val() === "ACTIVE") {
                        tempActive.push(snap.child(key).val())
                    }
                    temp.push(snap.child(key).val())
                }
                setOriginalList(temp)
                setList(tempActive)
            }
        })
    }, [])

    const handleTabSelect = (value) => {
        let temp = []
        setSearchWord("")

        switch(value) {
            case "ACTIVE": {
                for (const index in originalList) {
                    if (originalList[index].status === "ACTIVE") {
                        temp.push(originalList[index])
                    }
                }
                setList(temp)
                setSelected("ACTIVE")
                setActionType("Entries")
                setActionTypeTwo("Disable")
                break
            }

            case "NEW": {
                for (const index in originalList) {
                    if (originalList[index].status === "NEW") {
                        temp.push(originalList[index])
                    }
                }
                setList(temp)
                setSelected("NEW")
                setActionType("Accept")
                setActionTypeTwo("Reject")
                break
            }

            case "DISABLED": {
                for (const index in originalList) {
                    if (originalList[index].status === "DISABLED") {
                        temp.push(originalList[index])
                    }
                }
                setList(temp)
                setSelected("DISABLED")
                setActionType("Disable")
                break
            }

            default: {}
        }
    }

    const handleAction = async (type, user) => {
        if (actionType === "Entries" && type === "ONE") {
            navigate("/Entries", {state:{item:user}})
        } 

        if (actionType === "Accept" && type === "ONE") {
            await set(ref(firebaseDatabase, "USER_ARCHIVE/"+user.uid+"/status"), "ACTIVE")
            setVisibility(true)
            setMessage("Operator moved to Active")
            setSeverity("success")
        }

        if (type === "TWO") {
            await set(ref(firebaseDatabase, "USER_ARCHIVE/"+user.uid+"/status"), "DISABLED")
            setVisibility(true)
            setMessage("Operator moved to Disabled")
            setSeverity("success")
        } 

        let temp = []
        let tempActive = []

        setActionType("Entries")
        setActionTypeTwo("Disable")
        await get(child(ref(firebaseDatabase), "USER_ARCHIVE")).then((snap) => {
            if (snap.exists()) {
                for (const key in snap.val()) {
                    if (snap.child(key).child("status").val() === "ACTIVE") {
                        tempActive.push(snap.child(key).val())
                    }
                    temp.push(snap.child(key).val())
                }
                setOriginalList(temp)
                setList(tempActive)
                setSelected("ACTIVE")
            }
        })
    }

    const handleSearch = () => {
        let temp = []

        for (const index in originalList) {
            if (originalList[index].name.toLowerCase().includes(searchWord.toLowerCase()) && originalList[index].status === selected) {
                temp.push(originalList[index])
            }
        }
        setList(temp)
    }

    return(
        <div className="operators-page-container">
            <div className="search-bar-container">
                <img src={searchIcon} alt="search" className="search-icon" />
                <input value={searchWord} onKeyUp={(event)=>{if(event.keyCode===13){handleSearch()}}} onChange={(event)=>{setSearchWord(event.target.value)}} className="search-bar" placeholder="Search by operator name" />
                <img src={crossIcon} alt="search" className="search-icon" onClick={()=>{setSearchWord(""); handleSearch()}} />
            </div>

            <div className="tab-container">
                <p className={selected==="ACTIVE"?"selected-item":"unselected-item"} onClick={()=>{handleTabSelect("ACTIVE")}}>Active</p>
                <p className={selected==="NEW"?"selected-item":"unselected-item"} onClick={()=>{handleTabSelect("NEW")}}>New</p>
                <p className={selected==="DISABLED"?"selected-item":"unselected-item"} onClick={()=>{handleTabSelect("DISABLED")}}>Disabled</p>
            </div>

            <Table hover className="table-container" responsive>
                <thead>
                    <tr className="header-container">
                        <th className="header-item">Date</th>
                        <th className="header-item">Name</th>
                        <th className="header-item">Phone Number</th>
                        <th className="header-item">Email-Id</th>
                        {
                            selected !== "DISABLED"
                            &&
                            <th className="header-item">Action</th>
                        }
                    </tr>
                </thead>
                <tbody className="data-container">
                    {
                        list.map((item, index) => {return(
                            <tr className="body-container">
                                <td className="body-item">{item.date}</td>
                                <td className="body-item">{item.name}</td>
                                <td className="body-item">{item.phoneNumber}</td>
                                <td className="body-item">{item.emailId}</td>
                                {
                                    selected !== "DISABLED"
                                    &&
                                    <td className="body-item"><div className="inner-div">
                                        <Button variant="contained" onClick={()=>{handleAction("ONE", item)}} style={{backgroundColor:"#0ed900", marginRight:10, height:30}} >{actionType}</Button>
                                        <Button variant="contained" onClick={()=>{handleAction("TWO", item)}} style={{backgroundColor:"#e31300", marginRight:10, height:30}} >{actionTypeTwo}</Button>
                                    </div></td>
                                }
                            </tr>
                        )})
                    }
                </tbody>
            </Table>

            <Snackbar anchorOrigin={{vertical:'top', horizontal:'right'}} open={visibility} autoHideDuration={3000} onClose={()=>{setVisibility(false)}}>
                <Alert onClose={()=>{setVisibility(false)}} severity={severityType} sx={{ width: '100%' }}>{message}</Alert>
            </Snackbar>
        </div>
    )
}

export default Operators