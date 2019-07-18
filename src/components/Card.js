import React from 'react';
import Date from './Date';
import Weather from './Weather';
import sunicon from '../../public/images/sun.png';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
    
    const STORM_ICON = '../../public/images/200thunderstorm.png';
    const RAIN_ICON = '../../public/images/300rain.png';
    const SNOW_ICON = '../../public/images/600snow.png';
    const FOG_ICON = '../../public/images/700fog.png';
    const SUN_ICON = '../../public/images/800clear.png';
    const FEW_CLOUDS_ICON = '../../public/images/801fewclouds.png';
    const MANY_CLOUDS_ICON = '../../public/images/802clouds.png';
    const UNKNOWN = '../../public/images/900unknown.png';
    
    let image = '';
    let altText = '';
    if (this.props.num === 0) {
            image =  SUN_ICON;
            altText = 'sunny day';

    }
    else if (this.props.num === 1) {
        image =  RAIN_ICON;
            altText = 'rainy day';
 
    }
    else {
       image = SNOW_ICON;
        altText = 'snowy day';
    
    }
    return(
        <div className="card">
            <p>Day {this.props.count}: {this.props.date}</p>
            <p>{this.props.description}</p>
            <p>{this.props.min_temp}&deg;/ {this.props.max_temp}&deg;</p>
            <Weather weatherOptions={this.props.num} />
            {/*<p>Number: {this.props.num}</p>*/}

        </div>
    );

}
   
}

export default Card;