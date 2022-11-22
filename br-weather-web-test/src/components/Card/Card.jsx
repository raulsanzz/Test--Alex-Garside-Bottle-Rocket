import React from 'react'
import Icon from '../Icons';

import './Card.scss';
function Card({ active,title, icon,onClick, highTemperature, lowTemperature, isSaturation, saturation, ...props }) {

    return (
        <div className='card-content' onClick={onClick}  style={{backgroundColor:active?"red":"white"}}>
            <label className='card.label'>{title}</label>
            <div className='card-icon'><Icon name={icon} ></Icon></div>
            <div className='card-temperature'>
                <label>{Math.round(highTemperature)}<sup>o</sup></label>
                <label> | {Math.round(lowTemperature)}<sup>o</sup></label>
            </div>

        </div>
    )
}

export default Card
