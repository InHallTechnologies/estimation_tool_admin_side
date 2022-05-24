import React from "react";
import './DashboardHeader.styles.scss';

const DashboardHeader = ({ totalAnalytics }) => {


    return (
        <div className="dashboard-header-container">
            <div className="section-container green">
                <h4 className="section-title">{totalAnalytics.date}</h4>
                <h2 className="section-value">Welcome Admin</h2>
            </div>
            <div className="section-container blue">
                <h4 className="section-title">Total Entries</h4>
                <h2 className="section-value">{totalAnalytics.entries.toLocaleString('en-IN')}</h2>
            </div>
            <div className="section-container yellow">
                <h4 className="section-title">Total Operators</h4>
                <h2 className="section-value">{totalAnalytics.operators.toLocaleString('en-IN')}</h2>
            </div>
            
        </div>
    )
}

export default DashboardHeader;