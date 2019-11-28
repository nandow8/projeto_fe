import React, { Component } from 'react';
import { View, Text, StyleSheet, YellowBox } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import socketIO from 'socket.io-client'

export default class MapScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
      markers: [],
    }

    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
    ])
  }

  componentDidMount() {
    //Get current location and set initial region to this
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => console.error(error),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
    );

    const socket = socketIO.connect("http://192.168.15.7:3100")

    socket.on('chat message', (msg) => {
      console.log(msg)
      
        this.setState({
          markers: msg
        })
    
    });

  }
 

  render() {
    return (
      <MapView
        style={styles.mapa}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }}

        showsUserLocation={true}
      >

      {
        this.state.markers.length > 0
        ? this.state.markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={"title"}
            description={"description"}
            image={require('app/assets/images/car.png')}
          />
        ))

        :null
      }
        
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  mapa: {
    width: '100%',
    height: '100%',
  }
});