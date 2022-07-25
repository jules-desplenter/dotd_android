import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import * as Svg from "react-native-svg";
import AppContext from "../components/AppContext";
import useAddUser from "../hooks/useAddUser";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";

interface props {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login(
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [text, onChangeText] = React.useState("");
  const id = React.useContext(AppContext);
  const isMounted = useRef(false);
  const { response, PostData } = useAddUser();
  const checklogin = (input: string) => {
    if (input.includes("dotd.tech/card")) {
      let ar = input.split("?id=");
      //@ts-ignore
      id?.setId(ar[1]);
      setLoggedIn(true);
    } else {
      alert("Not a valid dotd card.");
    }
  };

  async function readNdef() {
    // try {
    //   // register for the NFC tag with NDEF in it
    //   await NfcManager.requestTechnology(NfcTech.Ndef);
    //   // the resolved tag object will contain `ndefMessage` property
    //   const tag = await NfcManager.getTag();
    //   //@ts-ignore
    //   // alert('Tag found nieuwe vesries' + JSON.stringify(tag?.ndefMessage.toRecords()));
    //   //@ts-ignore
    //   console.log("Tag Discovered", tag);
    //   let security = false;
    //   let parsed = null;
    //   if (tag?.ndefMessage && tag.ndefMessage.length > 0) {
    //     // ndefMessage is actually an array of NdefRecords,
    //     // and we can iterate through each NdefRecord, decode its payload
    //     // according to its TNF & type
    //     const ndefRecords = tag.ndefMessage;

    //     function decodeNdefRecord(record: any) {
    //       if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
    //         if (
    //           Ndef.text.decodePayload(record.payload) ==
    //           "a11e4ea5-c2e8-4994-bec3-26587f3ad720"
    //         ) {
    //             security = true;
    //         }else{
    //             alert("Not a valid dotd card.")
    //         }}
    //       if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
    //         setTimeout(() => {
    //           if(security == true){
    //             onChangeText(Ndef.uri.decodePayload(record.payload));
    //             checklogin(Ndef.uri.decodePayload(record.payload).toString());
    //           }else{
    //             alert("Not a valid dotd card.")
    //           }
    //         }, 500);
              
    //         }
    //       return "unknown";
    //     }

    //     parsed = ndefRecords.map(decodeNdefRecord);
    //   }
    // } catch (ex) {
    //   alert("Not a valid dotd card.")
    // } finally {
    //   // stop the nfc scanning
    //   NfcManager.cancelTechnologyRequest();
    // }
    checklogin("dotd.tech/card?id=0");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" hidden={true} />
      <Text
        style={{
          color: "white",
          fontSize: 50,
          marginTop: 60,
          marginLeft: 40,
          marginBottom: 15,
        }}
      >
        Hi!
      </Text>
      <Text
        style={{
          color: "white",
          opacity: 50,
          fontSize: 20,
          marginBottom: 5,
          marginLeft: 40,
        }}
      >
        Click the button below to set up
      </Text>
      <Text
        style={{
          color: "white",
          opacity: 50,
          fontSize: 20,
          marginBottom: 50,
          marginLeft: 40,
        }}
      >
        your card.
      </Text>
      <Image
        source={{
          uri: "https://dotdstorage.blob.core.windows.net/logos/login2.png",
        }}
        style={{ width: "100%", height: 200 }}
      ></Image>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          position: "absolute",
          bottom: 50,
          left: 40,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#51A0D5",
            width: 300,
            height: 60,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={readNdef}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Set up Card</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1000,
    backgroundColor: "#052846",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  input: {
    backgroundColor: "#052846",
    borderColor: "white",
    width: 300,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: 10,
    marginBottom: 75,
  },
});
