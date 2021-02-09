import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default class ScanScreen extends Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedFood: '',
        scannedDiet: '',
        scannedCondition: '',
        buttonState: 'normal',
        transactionMessage: ''
      }
    }
    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState} = this.state

      if(buttonState==="Food"){
        this.setState({
          scanned: true,
          scannedFood: data,
          buttonState: 'normal'
        });
      }
      else if(buttonState==="Diet"){
        this.setState({
          scanned: true,
          scannedDiet: data,
          buttonState: 'normal'
        });
      }
      
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }
      
      else if (buttonState === "normal"){
        return(
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View>
              <Image
                source={require("../assets/splash.png")}
                style={{width:200, height: 200}}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>ScaNEat</Text>
            </View>
            <View style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              placeholder="Food"
              onChangeText={(text)=>{
                this.setState({
                  scannedFood: text
                })
              }}
              value={this.state.scannedFood}/>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions("Food")
              }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.inputView}>
            <TextInput  
              style={styles.inputBox}
              placeholder="Diet"
              onChangeText={(text)=>{
                this.setState({
                  scannedDiet: text
                })
              }}
              value={this.state.scannedDiet}/>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions("Diet")
              }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.inputView}>
            <TextInput  
              style={styles.inputBox}
              placeholder="Condition"
              onChangeText={(text)=>{
                this.setState({
                  scannedCondition: text
                })
              }}
              value={this.state.scannedCondition}/>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions("Condition")
              }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
            </View>
            
            
            <Text style={styles.transactionAlert}>{this.state.transactionMessage}</Text>
            <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              var against = 0;
              var tsf = this.state.scannedFood.toLowerCase().trim();
              var tsd = this.state.scannedDiet.toLowerCase().trim();
              var tsc = this.state.scannedCondition.toLowerCase().trim();

              if (tsf.includes('beef')) {
                var BeefA = true;
                if (
                  tsd === 'vegan' ||
                  tsd === 'veg' ||
                  tsd === 'jain' ||
                  tsd === 'hindu' ||
                  tsd === 'egg'
                ) {
                  against += 1;
                  console.log(tsf + ':' + tsd + '      Foods against  :  ' + against);
                }
              } else if (tsf === '') {
                Alert.alert('No input in field');
              } else {
                BeefA = false;
              }
              if (BeefA === false && tsf ==='beef') {
                against += 0;
                console.log(tsf + ':' + tsd + '      Foods against  :  ' + against);
              }

              if (tsf.includes('chicken')) {
                var chickenA = true;
                if (
                  tsd === 'vegan' ||
                  tsd === 'veg' ||
                  tsd === 'jain' ||
                  tsd === 'egg'
                ) {
                  against += 1;
                  console.log(tsf + ':' + tsd + '      Foods against  :  ' + against);
                }
              } else if (tsf === '') {
                Alert.alert('No input in field');
              } else {
                chickenA = false;
              }
              if (chickenA === false && tsf === 'chicken') {
                against += 0;
                console.log(tsf + ':' + tsd + '      Foods against  :  ' + against);
              }

              if (tsf.includes('milk') && tsd === 'vegan') {
                against += 1;
                console.log(tsf + ':' + tsd + '      Foods against  :  ' + against);
              } else if (tsf === '') {
                Alert.alert('No input in field');
              }
              if (tsf.includes('milk') && tsd.includes('vegan') === false) {
                against += 0;
                console.log(tsf + ':' + tsd + '      Foods against  :  ' + against);
              }

              if (tsf === 'potato' && tsd === 'jain') {
                var potatoA = true;
                against += 1;
                console.log(tsf + ':' + tsd + '      Foods against  :  ' + against);
              } else if (tsf === '') {
                Alert.alert('No input in field');
              } else {
                potatoA = false;
              }
              if (potatoA === false && tsf === 'potato') {
                against += 0;
                console.log(tsf + ':' + tsd + '      Foods against  :  ' + against);
              }

              // anything thats not against ANY diet on the list
              if (tsf.includes('salt') || 
                 tsf.includes('dal') || 
                 tsf.includes('cumin') || 
                 tsf.includes('mango') || 
                 tsf.includes('orange') || 
                 tsf.includes('strawberry') || 
                 tsf.includes('grape') || 
                 tsf.includes('sugar') || 
                 tsf.includes('starch') || 
                 tsf.includes('pistachio') || 
                 tsf.includes('dhal') || 
                 tsf.includes('palm oil') || 
                 tsf.includes('maida') || 
                 tsf.includes('refined wheat flour') || 
                 tsf.includes('hibiscus') && 
                 tsc === '') {
                // |
                // v
                against += 0;
                console.log(tsf + ':' + tsd + '      Foods against  :  ' + against);
              }

              // Thread for conditions :
              if (tsc === 'diabetes') {
                if (tsf.includes('sugar') || tsf.includes('sweetener')) {
                  var diabetesA = true;
                  Alert.alert('Contains : SUGAR');
                  console.log(tsc + ' ' + tsd);
                } else if (tsf === '') {
                  Alert.alert('No input in field');
                } else {
                  diabetesA = false;
                }
                if (diabetesA === false && tsf.includes('sugar')) {
                  against += 0;
                  console.log(tsc + ' ' + tsd);
                }
              }

              if(against > 0){
                Alert.alert('This list IS against your diet! ' + against + ' non-compliant food(s) exists in this list.')
              }else if(against === 0){
                Alert.alert("None of the food(s) in this list are against your diet.")
              }
            }}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      );
    }
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    submitButton:{
      backgroundColor: '#FBC02D',
      width: 100,
      height:50
    },
    submitButtonText:{
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight:"bold",
      color: 'white'
    },
    transactionAlert:{
      margin:10,
      color: 'red'
    }
  });