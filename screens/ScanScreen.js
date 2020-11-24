import {image, View,touchableopacity,text,stylesheet} from 'react-native'
import React from 'react';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    cunstructor(){
    super();
    this.state = {
        hasCameraPermissions:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal'
    }
    }
 
    getCameraPermissions=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({hasCameraPermissions:status==="granted",buttonState:"clicked"})
      }
      handleBarCodeScanned=async({type,data})=>{
     this.setState({scanned:true,scannedData:data,buttonState:"normal"})
      }
      render(){
        const hasCameraPermissions=this.state.hasCameraPermissions
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState==="clicked"&&hasCameraPermissions){
          return(
            <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}/>
          )
        }
        else if(buttonState==="normal"){
          return (
           <View>
              <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermissions} title="Bar Code Scanner">
   <Text style={styles.buttonText}>Scan QR Code</Text>
              </TouchableOpacity>
    
            </View>
          )
        }
        
      }
    
      }
    
      