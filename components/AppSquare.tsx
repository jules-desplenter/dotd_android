import React from "react";
import { Pressable, Text, StyleSheet, Image } from "react-native";
import * as Svg from "react-native-svg";

interface props {
  onChangeText: any;
  setState: any;
  state: boolean;
  text: string;
  name:string;
  onChangeImportance: any;
  importance: string;
  otherModal?:any
  smallStyle?: any;
  setRefreshApps?: any;
  startUrl?: string;
}

export default function AppSquare(props: props) {
  return (
    <Pressable
      onPress={() => {
        if(props.otherModal){
          props.otherModal(false);
        }
        props.setState(true);
        props.text != "" ? props.onChangeText(props.text) : props.onChangeText(props.startUrl);
        props.onChangeImportance(props.importance)
      }}
      style={[styles.square,props.smallStyle && {width: 100}]}
    >
      {
        props.smallStyle ?
        <Image
        style={{ borderRadius: 20, overflow: "hidden", width: 75, height: 75 }}
        source={{uri: "https://dotdstorage.blob.core.windows.net/logos/" +
        props.name +
        "-Icon.png"}}
      /> :
      <Image
      style={{ borderRadius: 20, overflow: "hidden", width: 100, height: 100 }}
      source={{uri: "https://dotdstorage.blob.core.windows.net/logos/" +
      props.name +
      "-Icon.png"}}
    />
      }
      
        <Text style={styles.text}>{props.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  square:{
    marginBottom: 10,
    justifyContent: 'center',
    width: 125
  },
  text:{
    textAlign: 'center',
    marginRight: 25,
    marginTop:10
  }
})