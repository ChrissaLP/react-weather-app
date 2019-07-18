import React from 'react';

import FetchWeather from './FetchWeather';

import STORM_ICON  from  '../../public/images/200thunderstorm.png';
import RAIN_ICON from  '../../public/images/300rain.png';
import  SNOW_ICON from '../../public/images/600snow.png';
import FOG_ICON from '../../public/images/700fog.png';
import SUN_ICON from '../../public/images/800clear.png';
import FEW_CLOUDS_ICON from '../../public/images/801fewclouds.png';
import MANY_CLOUDS_ICON from '../../public/images/802clouds.png';
import UNKNOWN_ICON from '../../public/images/900unknown.png';

export default class Weather extends React.Component {
    constructor(props) {
        super(props);
    }
    
    getImage = () => {
        let image = {
            source: '',
            alt: ''
        };
        // determine which icon to use based on icon code
        if (this.props.iconCode < 300) {
            image.source = STORM_ICON;
            image.alt = 'thunderstorms';

        }
        else if (this.props.iconCode < 600) {
            image.source = RAIN_ICON;
            image.alt = 'rain';

        }
        else if (this.props.iconCode < 700) {
            image.source = SNOW_ICON;
            image.alt = 'snow';

        }
        else if (this.props.iconCode < 800) {
            image.source = FOG_ICON;
            image.alt = 'fog';
        }
        else if (this.props.iconCode === 800) {
            image.source = SUN_ICON;
            image.alt = 'clear';
        }
        else if (this.props.iconCode === 801) {
            image.source = FEW_CLOUDS_ICON;
            image.alt = 'few clouds';
        }
        else if (this.props.iconCode === 802) {
            image.source = MANY_CLOUDS_ICON;
            image.alt = 'mostly cloudy';
        }
        else {
            image.source = UNKNOWN_ICON;
            image.alt = 'unknown precipitation';
        }
        return image;

    };
    
    render() {
       {/*  
        let image = '';
        let alttext='';
        if (this.props.weatherOptions===0) {
            image = SUN_ICON;
            alttext = 'sun';
        }
        else if (this.props.weatherOptions===1) {
            image = RAIN_ICON;
            alttext='rain';
        }
        else {
            image = SNOW_ICON;
            alttext='snow';
        }
        */}

        let image = this.getImage();
        console.log(this.props.iconCode);
        return (
            <div>
                <img className="weather-img" src={image.source} alt="{image.alt}" />
                <p className="weather-text">{image.alt}</p>
                { /* <FetchWeather /> */ }
            </div>
        );
    }
}

