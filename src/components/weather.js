import React, { Component } from 'react';
import io from "socket.io-client";

export default class Weather extends Component {
   constructor(props){
      super(props);
      this.state = { weather: [], loader: { display: 'block' } }
   }
   componentDidMount(){
      this._isMounted = true;
      this.getCurrentPosition().then( res => {
          this.socket = io('http://localhost:9000', { query: 'latitude=' + res.coords.latitude + '&longitude=' + res.coords.longitude , transports: [ 'websocket', 'polling', 'flashsocket' ] });
          this.socket.on('weather', response => {
              if (this._isMounted) this.setState({ weather: response, loader: { display: 'none' } });
          });
      });
   }
   componentWillUnmount() {
      this._isMounted = false;
   }
   getCurrentPosition(options = {}){
      if ( navigator.geolocation) {
          return new Promise(
            (resolve, reject) => navigator.geolocation.getCurrentPosition( resolve, reject )
          )
      } else {
          return new Promise(
            resolve => resolve({})
          )
      }
   };

   displayWeather(){
      let date = new Date(), sunrise = new Date(this.state.weather.sunrise * 1000), sunset = new Date(this.state.weather.sunset * 1000), icon, style = { margin: '10px 0' };      
      if ( date.getHours() >= sunrise.getHours() && date.getHours() < sunset.getHours()) {
           icon = `wi wi-owm-day-${this.state.weather.id}`;
      }
      if ( date.getHours() >= sunset.getHours()) {
           icon = `wi wi-owm-night-${this.state.weather.id}`;
      }
      if( Object.keys(this.state.weather).length > 0 ) {
          return(
            <div style={style}>
              <h1 className="weather-icon"><i className={icon}></i></h1>
              <h2 className="location-namer">{this.state.weather.name}</h2>
              <h4 className="weather-description">{this.state.weather.description}, {this.state.weather.temp}<i className="wi wi-degrees"></i></h4>
            </div>
          );
      }
   }
   render(){
      return(
         <div className="col-lg-12 col-md-12 text-center">
            <p style={this.state.loader}>loading...</p>
            { this.displayWeather() }
         </div>
      );
   }
}