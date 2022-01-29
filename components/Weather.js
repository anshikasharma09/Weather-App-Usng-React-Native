import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,ImageBackground,Dimensions,StatusBar} from 'react-native';
import SearchBar from './SearchBar';
import { haze, rainy, snow, sunny, clouds, mist } from '../assets/backgroundImages/index';

export default function Weather({ weatherData, fetchWeatherData }) {
  const [backgroundImage, setBackgroundImage] = useState(null);

  const {
    weather,
    name,
    main: { temp, humidity },
    wind: { speed },
  } = weatherData;
  const [{ main }] = weather;

  useEffect(() => {
    setBackgroundImage(getBackgroundImg(main));
  }, [weatherData]);

  function getBackgroundImg(weather) {
    if (weather === 'Snow') return snow;
    if (weather === 'Clear') return sunny;
    if (weather === 'Rain') return rainy;
    if (weather === 'Haze') return haze;
    if (weather == 'Clouds') return clouds;
    if(weather=='Mist') return mist;
    return haze;
  }

  let textColor = backgroundImage !== sunny ? 'white' : 'black';

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="darkgrey" />
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImg}
        resizeMode="cover">
        <SearchBar fetchWeatherData={fetchWeatherData} />

        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              ...styles.headerText,
              color: 'black',
              fontWeight: 'bold',
              fontSize: 60,
            }}>
            {name}
          </Text>
          <Text
            style={{
              ...styles.headerText,
              color: 'black',
              fontWeight: 'bold',
              fontSize: 54,
            }}>
            {main}
          </Text>
          <Text
            style={{
              ...styles.headerText,
              color: 'black',
              fontSize: 50,
              fontWeight: 'bold',
            }}>
            {temp} °C
          </Text>
        </View>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
              Humidity
            </Text>
            <Text style={{ fontSize: 36, color: 'white', fontWeight: 'bold' }}>
              {humidity} %
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
              Wind Speed
            </Text>
            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
              {speed} m/s
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  headerText: {
    fontSize: 36,
    marginTop: 10,
  },
  extraInfo: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    padding: 20,
  },
  info: {
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
});
