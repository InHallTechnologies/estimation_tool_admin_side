import React, { useEffect, useState } from 'react';
import EffortsArch from '../../components/EffortsArch/EffortsArch.component';
import ResultsArch from '../../components/ResultArch/ResultsArch.component';
import TopOverview from '../../components/TopOverview/TopOverview.component';
import './estimationDetails.styles.scss';
import logo from "../../assets/logo.png"
import { useLocation, useNavigate } from 'react-router-dom';
import { child, onValue, ref } from 'firebase/database';
import { firebaseDatabase } from '../../backend/firebaseHandler';
import { CircularProgress } from '@mui/material';
import { IoArrowBack } from "react-icons/io5"

const EstimationDetails = (props) => {
    
    const location = useLocation()
  
    const entryKey = location.state.item
    const [loading, setLoading] = useState(true);
    const [entry, setEntry] = useState({})
    const navigate = useNavigate()
   
    useEffect(() => {
        window.scrollTo(0, 0)
       
        onValue(child(ref(firebaseDatabase), `ALL_ENTRIES_ARCHIVE/${entryKey}`), (snap)=>{
            if (snap.exists()) {
                const entry = snap.val();
               
                setEntry(entry);
                setLoading(false)
            }
        }, { onlyOnce:true })
    }, [])

    if (loading) {
        return (
            <div>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className='estimation-details-container'>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <IoArrowBack size={20} onClick={()=>{navigate(-1)}} color="#FE5C1C" style={{marginBottom:20, marginRight:10, cursor:'pointer', marginTop:30, marginLeft:30, marginRight:10}} />
                <img src={logo} alt="estimation-tool" className="logo" />
            </div>
            
            <div className='estimation-details-content'>
                <h1 className='project-name'>{entry.projectName}</h1>
                <p className='project-details'>{entry.projectDescription}</p>
                <div className='top-overview-area'>
                    <TopOverview 
                        title={"General"} 
                        color="#FF5858"
                        objects={[{value:entry.numOfRequirements, title:'Requirements'}, {value:entry.numOfSystems?entry.numOfSystems:"New", title:'Systems'}, {value:entry.complexity, title:'Complexity'}, {value:entry.tShirt, title:'T-Shirt'}]}
                    />
                    <TopOverview 
                        title={"Resources"} 
                        color="#FBBC05"
                        objects={[{value:entry.resources.l6?entry.resources.l6:"-", title:'Level 6'}, {value:entry.resources.l5?entry.resources.l5:"-", title:'Level 5'}, {value:entry.resources.l4?entry.resources.l4:"-", title:'Level 4'}]}
                    />
                    <TopOverview 
                        title={"Third Party Systems"} 
                        color="#58FF69"
                        objects={[{value:entry.thirdPartySystem.p40Effort?entry.thirdPartySystem.p40Effort:"-", title:'40% Effort'}, {value:entry.thirdPartySystem.p20Effort?entry.thirdPartySystem.p20Effort:"-", title:'20% Effort'}, {value:entry.thirdPartySystem.p10Effort?entry.thirdPartySystem.p10Effort:"-", title:'10% Effort'}]}
                    />
                    <TopOverview 
                        title={"Vendor"} 
                        color="#58D7FF"
                        objects={[{value:entry.vendorResource, title:'Resources'}, {value:entry.vendorRateGBP, title:'Rate'}]}
                    />
                </div>                
            </div>

            <div className='effort-breakdown-container'>
                <p className='efforts-breakdown-title'>Defining Parameters</p>
                <div className='efforts-breakdown-list'>
                    <EffortsArch value={entry.hoursTo.developPerRequirement*parseInt(entry.numOfRequirements)} formula="(Comp=Low:40, Comp=Medium:80, Comp=High:120, Comp=Very High:160) * No. of requirements" title="Total hours to develop (A)" />
                    <EffortsArch value={entry.hoursTo.performTestPerRequirement} formula="(Comp=Low:80, Comp=Medium:120, Comp=High:160, Comp=Very High:200) * No. of requirements" title="Total hours to perform test (B)" />
                    <EffortsArch value={entry.hoursTo.performDesignPerRequirement} formula="(Comp=Low:40, Comp=Medium:80, Comp=High:120, Comp=Very High:200) * No. of requirements" title="Total hours to perform design (C)" />
                    <EffortsArch value={entry.hoursTo.performPMperRequirement} formula="(Comp=Low:40, Comp=Medium:120, Comp=High:160, Comp=Very High:180) * No. of requirements" title="Total hours to perform PM (D)" />
                    <EffortsArch value={entry.hoursTo.performBAperRequirement} formula="(Comp=Low:8, Comp=Medium:16, Comp=High:24, Comp=Very High:32) * No. of requirements" title="Total hours to perform BA (E)" />
                </div>
            </div>

            <div className='effort-breakdown-container' style={{marginTop:0}}>
                <p className='efforts-breakdown-title'>Formula to Auto-populate Metadata</p>
                <div className='efforts-breakdown-list'>
                    <EffortsArch value={entry.hoursTo.p40thirdPartyVendorPerRequirement} formula="(((A+B+C)*40%)/No. of third party system) * No. of requirements" title="Total hours for third party vendor (40%) (F)" />
                    <EffortsArch value={entry.hoursTo.p20thirdPartyVendorPerRequirement} formula="(((A+B+C)*20%)/No. of third party system) * No. of requirements" title="Total hours for third party vendor (20%) (G)" />
                    <EffortsArch value={entry.hoursTo.p10thirdPartyVendorPerRequirement} formula="(((A+B+C)*10%)/No. of third party system) * No. of requirements" title="Total hours for third party vendor (10%) (H)" />
                </div>
            </div>

            <div className='result-container'>
                <h2 className='result-title'>Formula to Generate Results</h2>
                <div className='result-list'>
                <ResultsArch color={'rgba(47, 168, 79, 0.12)'} formula="(A+B+C+D+E+F+G+H)" value={parseFloat(entry.estimatedTime.hours).toLocaleString('en-IN')} title="Total hours estimated (MH)" />
                <ResultsArch color={'rgba(66, 133, 244, 0.17)'} formula="MH/8" value={parseFloat(entry.estimatedTime.days).toLocaleString('en-IN')} title="Total days estimated (MD)" />
                <ResultsArch color={'rgba(251, 188, 5, 0.24)'} formula="(L6*100 + L5*155 + L4*285 + Vendor Resource*Vendor GBP)*MD" value={"£ "+parseFloat(entry.estimatedTotalCost).toLocaleString('en-IN')} title="Total cost estimated (GBP)" />
                </div>
            </div>
        </div>
    )
}

export default EstimationDetails