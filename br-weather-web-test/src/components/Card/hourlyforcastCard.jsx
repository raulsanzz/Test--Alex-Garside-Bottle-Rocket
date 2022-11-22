import React from 'react'
import Icon from '../Icons';
import './hourlyforcast.scss'
export default function hourlyforcastCard({ title,onClick, icon, Temperature,  isSaturation, saturation, ...props }) {
  return (
    <div className='hourly-card-content' onClick={onClick}>
    <label className='card.label'>{`${title.charAt(0)} ${title.charAt(8)}${title.charAt(9)}`}</label>
    <div className='card-icon'><Icon name={icon} ></Icon></div>
    <div className='card-temperature'>
        <label>{Math.round(Temperature)}<sup>o</sup></label>
    </div>

</div>
  )
}
