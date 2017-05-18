import React from 'react';
import PropTypes from 'prop-types';
import canUseDOM from "can-use-dom";

import raf from "raf";
import {withGoogleMap, GoogleMap, Circle, InfoWindow,Marker} from "react-google-maps";
import {searchFoodyFromApi} from 'api/posts.js'
import './FoodMap.css'

const geolocation = (canUseDOM && navigator.geolocation
  ? navigator.geolocation
  : ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    }
  }));

const GeolocationExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap defaultZoom={14} center={props.center}>
    {props.center && (
      <InfoWindow position={props.center}>
        <div>{props.content}</div>
      </InfoWindow>
    )}
    {props.center && (<Circle center={props.center} radius={props.radius} options={{
      fillColor: `green`,
      fillOpacity: 0.20,
      strokeColor: `green`,
      strokeOpacity: 1,
      strokeWeight: 1
    }}/>)}
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

export default class FoodMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      center: null,
      content: null,
      radius: 500,
      rests:[],
      markers:[]
    };

    this.isUnmounted = false;

  }
  handleMarkerRightClick(marker){
    console.log(marker.key);
  }

  componentDidMount() {
    const tick = () => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        radius: Math.max(this.state.radius - 20, 0)
      });

      if (this.state.radius > 200) {
        raf(tick);
      }
    };
    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        content: `你在這兒.`
      },()=>{
        console.log("lat",this.state.center.lat,"lng",this.state.center.lng);
        searchFoodyFromApi(this.state.center.lat,this.state.center.lng).then(n => {
          console.log("ajax call", n);
          let marker=[];
          for(var el of n)
          {
            let m={
              position:{lat:el.lat,lng:el.lng},
              defaultAnimation: 2,
              key: el.name
            }
            marker.push(m);
          }
          this.setState({markers:marker,rests:n});
        }).catch(err => {
          console.error('Error foody map', err);
          this.setState({center:null});
        });
      });

      raf(tick);
    }, (reason) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: 60,
          lng: 105
        },
        content: `Error: The Geolocation service failed (${reason}).`
      });
    });
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {

    return (
      <div className="wrapper-map">
        <GeolocationExampleGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          center={this.state.center}
          content={this.state.content}
          radius={this.state.radius}
          markers={this.state.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
        />
      </div>

    );
  }
}
