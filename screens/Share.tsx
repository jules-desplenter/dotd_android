import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Clipboard,
  Share,
  Image,
  Linking,
} from "react-native";
import FlipCard from "react-native-flip-card";
import SvgQRCode from "react-native-qrcode-svg";
import AppContext from "../components/AppContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Svg from "react-native-svg";

export default function ShareScreen() {
  const id = useContext(AppContext);
  const url = `https://dotd.tech/card/?id=` + (id ? (id.Id ? id.Id : "") : "");
  const handleClick = () => {
    Clipboard.setString(url);
    alert("copied");
  };

  const handleClick2 = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const name = id?.name;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Connect with me: " + url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  const [flip, setFlip] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setFlip(false);
    }, 750);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{marginTop: 120}}>

      <View style={styles.split}>
      <Text style={styles.cardName}>Hi, {name}.</Text>

        <View style={{ height: 250 }}>
          <FlipCard
            friction={6}
            perspective={1000}
            flipHorizontal={false}
            flipVertical={true}
            flip={flip}
            clickable={true}
            alignHeight={false}
          >
            {/* Face Side */}
            <View style={styles.face}>
              <Ionicons
                style={styles.qr}
                name="qr-code-outline"
                size={32}
                color="#485765"
              />
              <Image
                style={{ width: 500, height: 250, marginLeft: 17 }}
                source={{
                  uri: "https://dotdstorage.blob.core.windows.net/logos/dotd_card.png",
                }}
              ></Image>
            </View>
            {/* Back Side */}
            <View style={[styles.cardshadow, styles.shadowProp]}>
              <SvgQRCode size={150} value={url} />
            </View>
          </FlipCard>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "500", marginTop: 30}}>
          Virtual
        </Text>
        <Text style={{marginTop: 10}}>active</Text>
        <StatusBar style="auto" />
        <View style={styles.under}>
          <Pressable
            style={styles.button}
            onPress={() => {
              onShare();
            }}
          >
            <View style={styles.icon}>
              <Ionicons
                name="ios-share"
                size={20}
                color="white"
                style={{ marginLeft: 2.5, marginBottom: 1 }}
              />
            </View>
            <Text style={{ fontSize: 15, color: "black" }}>Share</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              handleClick();
            }}
          >
            <View style={styles.icon}>
              <Ionicons
                name="ios-copy"
                size={20}
                color="white"
                style={{ marginLeft: 2.5, marginBottom: 1 }}
              />
            </View>
            <Text style={{ fontSize: 15, color: "black" }}>Copy</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              handleClick2(url);
            }}
          >
            <View style={styles.icon}>
              <Ionicons
                name="ios-link"
                size={20}
                color="white"
                style={{ marginLeft: 2.5, marginBottom: 1 }}
              />
            </View>
            <Text style={{ fontSize: 15, color: "black" }}>Visit</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              handleClick2("https://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=" + url);
            }}
          >
            <View style={styles.icon}>
              <Ionicons
                name="qr-code-outline"
                size={20}
                color="white"
              />
            </View>
            <Text style={{ fontSize: 15, color: "black" }}>Qr</Text>
          </Pressable>
        </View>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 3,
    marginBottom: -40,
    backgroundColor: "white",
    shadowColor: "white",
  },
  under: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 330,
    flexDirection: "row",
    marginTop: 60,
    paddingBottom: 200,
  },
  icon: {
    height: 40,
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 100,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  split: {
    height: 400,
    justifyContent: "space-between",
    alignItems: "center",
  },
  face: {
    // height: 300,
  },
  cardshadow: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 350,
    height: 225,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
  qr: {
    position: "relative",
    bottom: -225,
    right: -390,
    zIndex: 100,
  },
  cardName: {
    color: "black",
    fontSize: 21,
    zIndex: 100,
    textAlign: "left",
    marginBottom: 50,
    width: 330
  },
});
