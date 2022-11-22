import React, { useState, useEffect } from 'react'
import BRLogo from '../Icons/Common/BRLogo';

//styles
import './Header.scss';

function Header() {
    const [selectedTemperature, SetSelectedTemperature] = useState(0);
    useEffect(() => {

    }, [selectedTemperature]);
    return (
        <div className='header-container'>
            <div className='app-logo-container'>
                <BRLogo />
                <h4 className='app-title'>Weather</h4>
            </div>
            <div className='switch-button-container'>
                <button className={`${selectedTemperature === 0 ? 'selected' : ''} temperature-btn foreign-heights-btn`}
                    onClick={() => SetSelectedTemperature(0)}>F<sup>o</sup></button>
                <button className={`${selectedTemperature === 1 ? 'selected' : ''} temperature-btn celsius-converter-btn`}
                    onClick={() => SetSelectedTemperature(1)}> C<sup>o</sup></button>
            </div >
        </div >
    )
}

export default Header
