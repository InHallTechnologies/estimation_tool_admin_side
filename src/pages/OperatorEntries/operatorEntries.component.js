import React, { useEffect, useState } from "react";
import "./operatorEntries.style.scss"
import { get, child, ref } from 'firebase/database'
import { firebaseDatabase } from '../../backend/firebaseHandler'
import logo from "../../assets/logo.png"
import EntriesArch from "../../components/EntriesArch/EntriesArch.component";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5"

const OperatorEntries = () => {

    const [list, setList] = useState([])
    const location = useLocation()
    const [user, setUser] = useState(location.state.item)
    const navigate = useNavigate()

    useEffect(()=>{
        let temp = []

        setUser(location.state.item)
        get(child(ref(firebaseDatabase), "OPERATOR_WISE_ENTRIES_ARCHIVE/"+user.uid)).then((snap)=>{
            if (snap.exists()) {
                for (const key in snap.val()) {
                    temp.push(snap.child(key).val())
                }
                setList(temp)
            }
        })
    }, [])

    return(
        <div className="operator-entries-container">
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", marginBottom:20}}>
                <IoArrowBack size={20} onClick={()=>{navigate(-1)}} color="#FE5C1C" style={{marginBottom:20, marginRight:10, cursor:'pointer', marginTop:30, marginLeft:30, marginRight:10}} />
                <img src={logo} alt="estimation-tool" className="logo" />
            </div>
            
            <div className="name-list-container">

                <p className="name">{user.name}</p>

                <div className="entries-list-container">
                    {
                        list.length === 0
                        ?
                        <p style={{fontWeight:600, color:"#ccc", padding:10}}>No entries yet!</p>
                        :
                        list.map(item => <EntriesArch key={JSON.stringify(item)} item={item} />)
                    }
                </div>

            </div>
        </div>
    )
}

export default OperatorEntries