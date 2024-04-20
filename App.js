import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import  * as Location from 'expo-location';

const MapScreen = () => {
  const addresses = [
    { latitude: -23.563210, longitude: -46.654250, title: "Ponto A" },
    { latitude: -23.562408, longitude: -46.655641, title: "Ponto B" },
  ];

  const [lat, setLat] = useState(-23.563210);
  const [longi, setLongi] = useState(-46.654250);

  const pegarLocalizacao = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        alert('Permissão para acessar a localização foi negada');
        return;
    }
    const options = {
        accuracy: Location.Accuracy.Highest,
        maximumAge: 1000 // Considera as localizações obtidas nos últimos 1 segundo
    };
  
    var loc = await Location.getCurrentPositionAsync(options);
    var latitude = loc.coords.latitude
    var longitude = loc.coords.longitude
  
    setLat(latitude); 
    setLongi(longitude);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.563210,
          longitude: -46.654250,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {addresses.map((place, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            title={place.title}
          />
        ))};
         <Marker
            key={3}
            coordinate={{ latitude: lat, longitude: longi }}
            title="Você"
          />
      </MapView>

      <Button onPress={pegarLocalizacao} title="Atualizar local"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: '100%',
    height: '60%',
  },
});

export default MapScreen;