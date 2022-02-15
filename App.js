/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert
} from 'react-native';



import {
  HmsPushEvent,
  RNRemoteMessage,
  HmsPushMessaging,
  HmsPushInstanceId,
} from "@hmscore/react-native-hms-push";

import HMSAnalytics from '@hmscore/react-native-hms-analytics';
import { AGCCrash } from '@react-native-agconnect/crash';





export default class App extends React.Component {


  sendAlert (message){
    Alert.alert(message);
  }

  getToken() {
    HmsPushInstanceId.getToken("")
      .then((result) => {
        this.sendAlert("Token: " +  result['result']);
        console.log("Token: " +  result['result']);
      })
      .catch((err) => {
        this.sendAlert("Token Error " + JSON.stringify(err));
        console.log("Token Error " + JSON.stringify(err));
      });
  }

  subscribe(topic) {
    HmsPushMessaging.subscribe(topic)
      .then((result) => {
        this.sendAlert("Topic: " +  JSON.stringify(result));
        console.log("Topic: " +  JSON.stringify(result));
      })
      .catch((err) => {
        this.sendAlert("Topic Error " + JSON.stringify(err));
        console.log("Topic Error " + JSON.stringify(err));
      });
  }

  unsubscribe(topic) {
    HmsPushMessaging.unsubscribe(topic)
      .then((result) => {
        this.sendAlert("unsubscribe: " +  JSON.stringify(result));
        console.log("unsubscribe: " +  JSON.stringify(result));
      })
      .catch((err) => {
        this.sendAlert("Unsubscrib Error " + JSON.stringify(err));
        console.log("Unsubscrib Error " + JSON.stringify(err));
      });
  }

  turnOnPush() {
    HmsPushMessaging.turnOnPush()
      .then((result) => {
        this.sendAlert("turnOnPush: " +  JSON.stringify(result));
        console.log("turnOnPush: " +  JSON.stringify(result));
      })
      .catch((err) => {
        this.sendAlert("turnOnPush Error " + JSON.stringify(err));
        console.log("turnOnPush Error " + JSON.stringify(err));
      });
  }

  turnOffPush() {
    HmsPushMessaging.turnOffPush()
      .then((result) => {
        this.sendAlert("turnOffPush: " +  JSON.stringify(result));
        console.log("turnOffPush: " +  JSON.stringify(result));
      })
      .catch((err) => {
        this.sendAlert("turnOffPush Error " + JSON.stringify(err));
        console.log("turnOffPush Error " + JSON.stringify(err));
      });
  }

 
  async setAnalyticsEnabled() {
    const enabled = true;
    HMSAnalytics.setAnalyticsEnabled(enabled)
      .then((res) => { console.log(JSON.stringify(res)) })
      .catch((err) => { console.log(JSON.stringify(err)) })
  }

  async customEvent() {
    const eventId = "begin_examination"
    const bundle = {"name": "exam_difficulty", "value": "high"}
    HMSAnalytics.onEvent(eventId, bundle)
        .then((res) => { console.log(JSON.stringify(res)) })
        .catch((res) => { console.log(JSON.stringify(res)) });

  }

  async setUserProfile() {
    const name = "favor_sport"
    const value = "volleyball"
    HMSAnalytics.setUserProfile(name, value)
      .then((res) => super.showResult(apiName.setUserProf, res))
      .catch((err) => super.showResult(apiName.setUserProf, err))
  }

  async pageStart() {
    const screenName = "AppScreen"
    const screenClassOverride = "App"
    HMSAnalytics.pageStart(screenName, screenClassOverride)
      .then((res) => super.showResult(apiName.startPage, res))
      .catch((err) => super.showResult(apiName.startPage, err))
  }

  async enableCrash() {
    AGCCrash.enableCrashCollection(true)
  }

  async testCrash() {
    AGCCrash.testIt();
  }
  


  
  render() {
    return (
          <View>
            <Text style={styles.titulo}>HMS - Push Kit</Text>
            <Button  title='Get HMS Token' onPress={() => this.getToken()}/>
            <View style={styles.separator}/>
            <Button title='Suscribe Topic' onPress={() => this.subscribe('HMSMain')}/>
            <View style={styles.separator}/>
            <Button title='Unsuscribe Topic' onPress={() => this.unsubscribe('HMSMain')}/>
            <View style={styles.separator}/>
            <Button  title='Turn On Push' onPress={() => this.turnOnPush()}/>
            <View style={styles.separator}/>
            <Button  title='Turn Off Push' onPress={() => this.turnOffPush()}/>
            <Text style={styles.titulo}>HMS - Analytics Kit</Text>
            <Button  title='Set Analytics Enabled' onPress={() => this.setAnalyticsEnabled()}/>
            <View style={styles.separator}/>
            <Button  title='Custom Event' onPress={() => this.customEvent()}/>
            <View style={styles.separator}/>
            <Button  title='Set User Profile' onPress={() => this.setUserProfile()}/>
            <View style={styles.separator}/>
            <Button  title='Page Start' onPress={() => this.pageStart()}/>
            <Text style={styles.titulo}>HMS - Crash Service</Text>
            <Button  title='Enable Crash Collection' onPress={() => this.enableCrash()}/>
            <View style={styles.separator}/>
            <Button  title='Test Crash' onPress={() => this.testCrash()}/>
          </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titulo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'    
  },
  separator: {
    margin: 10
  },
  btns: {
    marginTop: 10
  },
});
