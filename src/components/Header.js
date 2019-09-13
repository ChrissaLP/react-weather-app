import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        
        return(
    
        <div className="header">
            <div className="header--container">
                    <p className="header__title">It's always sunny in Philadelphia!</p>
                    <p className="header__subtitle">Weather App</p>
            </div>
        </div>
        );
    }
}

