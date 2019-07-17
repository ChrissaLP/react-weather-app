import React from 'react';
import Date from './Date';
import Weather from './Weather';
import sunicon from '../../public/images/sun.png';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {

    const SUN_ICON = '../../public/images/sun.png';
    const RAIN_ICON = '../../public/images/rain.png';
    const SNOW_ICON = '../../public/images/snow.png';
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
            <Weather weatherOptions={this.props.num} />
            {/*<p>Number: {this.props.num}</p>*/}

        </div>
    );

}
   
}

export default Card;