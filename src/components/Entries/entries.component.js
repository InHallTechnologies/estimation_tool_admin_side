import React, { useEffect, useState } from "react";
import './entries.style.scss'
import searchIcon from '../../assets/search_icon.png'
import crossIcon from '../../assets/close_icon.png'
import { Button, Table } from "@mui/material";
import { child, get, ref } from "firebase/database";
import { firebaseDatabase } from "../../backend/firebaseHandler";
import EntriesArch from "../EntriesArch/EntriesArch.component";
import moment from 'moment';

const Entries = () => {

    const [searchWord, setSearchWord] = useState("")
    const [selected, setSelected] = useState("ALL")
    const [originalList, setOriginalList] = useState([])
    const [entriesList, setEntriesList] = useState([])

    useEffect(() => {
        let temp = []

        get(child(ref(firebaseDatabase), "ALL_ENTRIES_META_DATA")).then((snap) => {
            if (snap.exists()) {
                for (const key in snap.val()) {
                    temp.push(snap.child(key).val())
                }

                setEntriesList(temp.reverse())
                setOriginalList(temp)
            }
        })
    }, [])

    const handleTabSelect = (value) => {
        let temp = []
        setSearchWord("")
        let currentDate = moment().format("Do MMMM YYYY")
        let currentMonth = currentDate.split(" ")[1]
        let currentYear = currentDate.split(" ")[2]

        switch(value) {
            case "ALL": {
                setEntriesList(originalList)
                setSelected("ALL")
                break
            }

            case "TODAY": {
                console.log(currentDate)
                for (const index in originalList) {
                    if (originalList[index].date === currentDate) {
                        temp.push(originalList[index])
                    }
                }
                console.log(temp)
                setEntriesList(temp)
                setSelected("TODAY")
                break
            }

            case "THIS MONTH": {
                for (const index in originalList) {
                    if (originalList[index].date.split(" ")[1] === currentMonth && originalList[index].date.split(" ")[2] === currentYear) {
                        temp.push(originalList[index])
                    }
                }
                setEntriesList(temp)
                setSelected("THIS MONTH")
                break
            }

            default: {}
        }
    }

    const handleSearch = () => {
        let temp = []

        for (const index in originalList) {
            if (originalList[index].projectName.toLowerCase().includes(searchWord.toLowerCase())) {
                temp.push(originalList[index])
            }
        }
        setEntriesList(temp)
        setSelected("ALL")
    }

    return(
        <div className="entries-page-container">
            <div className="search-bar-container">
                <img src={searchIcon} alt="search" className="search-icon" />
                <input value={searchWord} onKeyUp={(event)=>{if(event.keyCode===13){handleSearch()}}} onChange={(event)=>{setSearchWord(event.target.value)}} className="search-bar" placeholder="Search by project name" />
                <img src={crossIcon} alt="search" className="search-icon" onClick={()=>{setSearchWord(""); handleSearch()}} />
            </div>

            <div className="tab-container">
                <p className={selected==="ALL"?"selected-item":"unselected-item"} onClick={()=>{handleTabSelect("ALL")}}>All</p>
                <p className={selected==="TODAY"?"selected-item":"unselected-item"} onClick={()=>{handleTabSelect("TODAY")}}>Today</p>
                <p className={selected==="THIS MONTH"?"selected-item":"unselected-item"} onClick={()=>{handleTabSelect("THIS MONTH")}}>This Month</p>
            </div>
            <div className="entries-list-container">
                {
                    entriesList.map(item => <EntriesArch key={JSON.stringify(item)} item={item} />)
                }
            </div>
        </div>
    )
}

export default Entries