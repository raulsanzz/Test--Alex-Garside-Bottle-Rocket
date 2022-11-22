import React, { useEffect, useState } from 'react';
//images
import Icon from '../Icons/index';
import City from '../Icons/city.png';

import './Home.scss';
import Card from '../Card/Card';
import HourlyforcastCard from '../Card/hourlyforcastCard';
import { fetchData } from '../../api/Api';

const Home = () => {
  const [dailyTemperatureData, setdailyTemperatureData] = useState([]);
  const [HourlyTemperatureData, sethourlyTemperatureData] = useState([]);
  const [currentTime, setCurrentTime] = useState([]);
  
  const [Data,setData]=useState([])
  const [active,setActive]=useState(false)
  const [activeCity,setActiveCity]=useState(0)
  console.log('cityTemperatureData',active);
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   const preCity=()=>{
     setActiveCity(activeCity + 1);
     fetchData();
   }
  
  const nextCity=()=>{
    setActiveCity(activeCity - 1);
    fetchData();
   }
  const citiId = {
    Austin: 'F52083D2-841C-4E1A-A4C9-83827B07D8EE',
    Boston: '1B4DBE6A-EB69-4357-8BE8-1968DD9ECDF3',
    Dallas: '0B66D5E5-039F-4951-A63A-2693464617CB',
    Nashville: '54A0CBA3-F4F8-47B8-974C-7FCE641CAD2C',
  };

  const fetchData = async (id) => {
    const baseUrl = `https://all-the-weather.herokuapp.com/forecasts/${id}?icon_mode=name`;
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } };

    try {
      const response = await fetch(baseUrl, options);
      const response_1 = await response.json();
       
      setdailyTemperatureData(response_1?.daily);
      sethourlyTemperatureData(response_1);
      return response_1;
    } catch (err) {
      return console.error(err);
    }
  };
  useEffect(() => {
    console.log(fetchData('1B4DBE6A-EB69-4357-8BE8-1968DD9ECDF3'));
  }, []);

  const CarosalControl = () => {
 
    return (
      <div className="carosal-control">
        <span>
          <Icon name="arrow-left" color="#D82121"  onClick={()=>preCity()}/>
          <label className="city-name">Dalas , TX</label>
          <Icon name="arrow-right" color="#D82121"onClick={()=>nextCity()} />
        </span>
        <span>
          {[0, 1, 2, 3].map((item, i) => {
            return <span className={`${item === active ? 'active' : ''} indicator`}></span>;
          })}
        </span>
      </div>
    );
  };

  return (
    <>
      <CarosalControl />
      <div className="carosal-sesction">
        <img src={City} alt="city-image" className="city-image" />
        <div className="carosal-info-section">
          <div className="weather-info-section">
            <div className="sub-section">
              <label>
                {HourlyTemperatureData?.current?.temperature}
                <sup>o</sup>
              </label>
              <p className="details">
                {HourlyTemperatureData?.current?.weather?.description}, Feels like{' '}
                {HourlyTemperatureData?.current?.feelsLikeTemperature}
                <sup>o</sup>
              </p>
            </div>
            <div className="sub-section">
              <button className="local-radar-btn">Local Radar</button>
              <button className="trash-btn">
                <Icon name="trash" color="#D82121" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="temp-info-container">
        <div className="weekly-forcast-container">
          <h4 className="weekly-forcast-title">Weekly Forcast</h4>
          {dailyTemperatureData?.slice(0, 7).map((dailyTemp,index) => {
            return (
              <Card
                title={days[new Date(dailyTemp?.timestamp).getDay()]}
                icon={dailyTemp?.weather?.icon}
                highTemperature={dailyTemp?.temperatures?.high}
                lowTemperature={dailyTemp?.temperatures?.low}
                onClick={()=>{
                  setCurrentTime(dailyTemp)
                  setActive(index , true)
                }
                
                }
                active={active}
              />
            );
          })}
          <div className="Weekly-forcast-sunset-content">
            <Icon name="sun" />
            <div className="forcast-sun-style">
              <label>
                Rise <span className="sun-rise-time">{new Date(currentTime.sunrise).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </label>
              <label>
                Set <span className="sun-set-time">{new Date(currentTime.sunset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </label>
            </div>
            <Icon name="moon" />
            <div className="forcast-moon-style">
              <label>
                Rise <span className="sun-rise-time">{new Date(currentTime.moonrise).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </label>
              <label>
                Set <span className="sun-set-time">{new Date(currentTime.moonset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </label>
            </div>
          </div>
        </div>
        <div className="Hourly-forcast-container">
          <h4 className="weekly-forcast-title">Hourly Forcast</h4>
          {HourlyTemperatureData?.hourly?.slice(0, 7).map((hourlyTemp) => {
            return (
              <HourlyforcastCard title={new Date(hourlyTemp?.timestamp).toLocaleTimeString()} 
              icon={hourlyTemp?.weather?.icon} Temperature={hourlyTemp?.temperature}
              onClick={()=>setData(hourlyTemp)} />
            );
          })}
          <div className="hourly-forcast-wind-speed-content">
            <div >
              <div className="hourly-card-space-style">
                <label>Real Feel</label>
                <span>{Math.round(Data?.feelsLikeTemperature)}<sup>o</sup></span>
              </div>
              <hr />
              <div className="hourly-card-space-style">
                <label>Wind Speed</label>
                <span>{Math.round(Data?.windSpeed)}mph</span>
              </div>
              <hr />
              <div className="hourly-card-space-style">
                <label>Wind direction</label>
                <span>{Data.windDirection}</span>
              </div>
              <hr />
            </div>
            <div>
              <div className="hourly-card-space-style">
                <label>UV index</label>
                <span>{Data.uvIndex}</span>
              </div>
              <hr />
              <div className="hourly-card-space-style">
                <label>Visibility</label>
                <span>{Data.visibility}</span>
              </div>
              <hr />
              <div className="hourly-card-space-style">
                <label>Humidity </label>
                <span>{Data.humidity}%</span>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
