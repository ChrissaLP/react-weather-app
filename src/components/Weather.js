import React from 'react';
import SUN_ICON from '../../public/images/sun.png';
import RAIN_ICON from '../../public/images/rain.png';
import SNOW_ICON from '../../public/images/snow.png';
import FetchWeather from './FetchWeather';

export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.getImage = this.getImage.bind(this);
    }
    getImage() {
        let image = {
            source: '',
            alt: ''
        };
        if (this.props.weatherOptions===0) {
            image.source = SUN_ICON;
            image.alt = 'sun';
        }
        else if (this.props.weatherOptions===1) {
            image.source = RAIN_ICON;
            image.alt = 'rain';
        }
        else {
            image.source = SNOW_ICON;
            image.alt = 'snow';
        }
        return image;

    }
    
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
        return (
            <div>
                <img className="weather-img" src={image.source} alt="{image.alt}" />
                <p className="weather-text">{image.alt}</p>
                { /* <FetchWeather /> */ }
            </div>
        );
    }
}

