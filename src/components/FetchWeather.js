import React from 'react';

// TO DO: delete class

export default class FetchWeather extends React.Component {

    state = {
        weatherData: []
    };
    // API key: 97fab495a1f5dadced86261b7a150032
    fetchWeather = (zip, apiKey) => {
        // can see if need this checking later
        if (zip) {
            fetch('https://api.weatherbit.io/v2.0/forecast/daily?postal_code=' + zip + '&key=' + apiKey).then(
                (response) => {
                return response.json();
                
            }).then((result) => {

                const weatherData = JSON.stringify(result);
                this.setState({ weatherData });

                // setState({ posts: result.data.children, lastPostName: result.data.children[result.data.children.length - 1].data.name });

                //console.log(that.state.posts);
            });
        }
        //console.log('https://api.openweathermap.org/data/2.5/forecast?postal_code=' + zip + '&key=' + apiKey);
    };  
    componentWillMount() {
        this.fetchWeather('19355', '767d944c186f4165b5d8dde168ee3323');
    }   

    render() {
        return (
            <div>
                {this.state.weatherData}
            </div>
        );
    }
}