import React from 'react';

import headerImg from '../../public/images/blue-bright-clouds.jpg';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        
        return(
    
        <div className="header">
            <div className="header__title">It's always sunny in Philadelphia!
                <p className="header__subtitle">Weather App</p>
            </div>
        </div>
        );
    }
}

