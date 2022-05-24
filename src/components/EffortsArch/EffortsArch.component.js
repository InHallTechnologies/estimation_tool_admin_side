import React from 'react'
import './EffortsArch.styles.scss';

const EffortsArch = ({ value, title, formula }) => {

    return (
        <div className='efforts-arch-container'>
            <p className='efforts-arch-value'>{value}</p>
            <p className='efforts-arch-title'>{title}</p>
            <p className='efforts-arch-formula'>{formula}</p>
        </div>
    )
}

export default EffortsArch;