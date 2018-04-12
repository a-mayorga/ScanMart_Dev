import React from 'react';
import {StyleSheet, View, Alert, ToastAndroid} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class BarcodeScanner extends React.Component {
  _onBarcodeRead = (code) => {
    Alert.alert('Verificar código', '¿El código es correcto? \n\n' + code.data, [
      {
        text: 'NO',
        onPress: () => console.log('Cancel pressed'),
        style: 'cancel'
      }, {
        text: 'SÍ, GUARDAR',
        onPress: () => {
          let codeData = {
            code: code.data
          };

          fetch('http://192.241.142.12:1337/scanmarket/product/savecode', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(codeData)
          }).then((res) => res.json()).then((resJSON) => {
            let status = resJSON.status;

            if (status === 1) {
              ToastAndroid.show('Código guardado con éxito', ToastAndroid.SHORT);
            } else if(status === 2) {
              ToastAndroid.show(resJSON.message, ToastAndroid.SHORT);
            }
          }).catch((err) => {

            console.log(err);
            ToastAndroid.show('No se pudo guardar el código', ToastAndroid.SHORT);
          });
        }
      }
    ])
  }

  render() {
    return (<View style={styles.container}>
      <RNCamera style={styles.preview} ref={ref => this.camera = ref} onBarCodeRead={this._onBarcodeRead}/>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
