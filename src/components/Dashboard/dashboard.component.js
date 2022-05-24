import React, { useEffect, useState } from "react";
import DashboardHeader from "../DashboardHeader/DashboardHeader.component";
import Graph from "../Graph/Graph.component";
import { ref, onValue } from 'firebase/database'
import './dashboard.style.scss';
import { firebaseDatabase } from "../../backend/firebaseHandler";
import moment from "moment";

const Dashboard = () => {
    const [entries, setEntries] = useState([])
    const [totalAnalytics, setTotalAnalytics] = useState({
        entries :0,
        operators: 0,
        date: moment().format("MMM Do YYYY")
    })

    useEffect(() => {
        const opreratorRef = ref(firebaseDatabase, `USER_ARCHIVE`);
        onValue(opreratorRef, async (snapshot) => {
            if (snapshot.exists()){
                const data = []
                let entries = 0;
                let operators = 0;
                for (const key in snapshot.val()) {
                    const user = snapshot.child(key).val();
                    const { name, uid } = user;
                    const count = await getNumberOfEntries(uid)
                    entries += count;
                    operators += 1;
                    data.push({
                        name, 
                        key: uid,
                        Estimations: count
                    })
                }
                setEntries(data);
                setTotalAnalytics(state => {
                    return {
                        ...state, operators, entries
                    }
                })
            }
        }, { onlyOnce:true })
    }, [])

    const getNumberOfEntries = (uid) => {
        const promise = new Promise((resolve, reject) => {
            onValue(ref(firebaseDatabase, `OPERATOR_WISE_ENTRIES_ARCHIVE/${uid}`), (entrySnapshot) => {
                if (entrySnapshot.exists()) {
                    resolve(entrySnapshot.size)
                }else {
                    resolve(0)
                }
            },{ onlyOnce:true })
        })
        return promise;
        
    }

    return (
        <div className="dashboard-container">
            <DashboardHeader totalAnalytics={totalAnalytics} />
            <Graph entries={entries} />
        </div>
    )
}

export default Dashboard;