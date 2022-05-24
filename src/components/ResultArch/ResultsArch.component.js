import React from 'react'
import './ResultsArch.styles.scss';

const ResultsArch = ({ value, title, color, formula }) => {

    return (
        <div className='results-arch-container' style={{backgroundColor:color}}>
            <h2 className='results-arch-value'>{value}</h2>
            <p className='results-arch-title'>{title}</p>
            <p className='results-arch-formula'>{formula}</p>
        </div>
    )
}

export default ResultsArch;