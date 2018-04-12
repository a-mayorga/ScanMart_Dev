import React from 'react';
import {StyleSheet, View, Alert, BackAndroid} from 'react-native';
import BarcodeScanner from './components/BarcodeScanner';
import Permissions from 'react-native-permissions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null
    };
  }

  componentDidMount() {
    this._checkForPermission();
    console.disableYellowBox = true;
  }

  _checkForPermission = () => {
    Permissions.request('camera').then(response => {
      this.setState({hasCameraPermission: response});
    });
  }

  _renderBarcodeScanner = () => {
    if (this.state.hasCameraPermission == 'authorized') {
      return (<BarcodeScanner/>)
    } else if (this.state.hasCameraPermission == 'denied') {
      Alert.alert('Permiso de cámara', 'Se necesita acceder a la cámara para continuar', [
        {
          text: 'CANCELAR',
          onPress: () => BackAndroid.exitApp(),
          style: 'cancel'
        },
        {
          text: 'INTENTAR DE NUEVO',
          onPress: () => this._checkForPermission()
        }
      ])
    }
  }

  render() {
    return (<View style={styles.container}>
      {this._renderBarcodeScanner()}
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
