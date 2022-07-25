import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Button,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
  Switch,
  ActivityIndicator,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AppContext from "../components/AppContext";
import useGetUser from "../hooks/useGetUser";
import * as Svg from "react-native-svg";
import useEditUser from "../hooks/useEditUser";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import GenericModal from "../components/GenericModal";
import AppSquare from "../components/AppSquare";
import { link, stat } from "fs";
import FavoriteSquare from "../components/FavoriteSquare";
import { useNavigation } from "@react-navigation/native";
import { useTimeout } from "usehooks-ts";
import { AnySizeDragSortableView, AutoDragSortableView, DragSortableView } from "react-native-drag-sort";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import DragDrop from "../components/DragDrop";
import Ionicons from "@expo/vector-icons/Ionicons";


export default function Edit(
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) {
  const slogans = [
    "Risk more than others \n think is safe. \n Dream more than \n other think is \n practical. \n \n -Howard Schulz",
    "Every problem is a \n gift \n -without problems \n we would not grow. \n \n Anthony Robbins",
    "Succes is not final: \n failure is not fatal: it \n is the courage to \n continue that \n counts. \n \n -Winston Churchill"
  ];
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const id = useContext(AppContext);
  const userId: any = id ? id : { Id: "" };
  const response = useGetUser(userId.Id);

  const [isEnabled, setIsEnabled] = useState(false);

  let [ob, setOb] = useState<any>();
  let [reload, setReload] = useState<any>("");
  let [modalNameVisible, setModalNameVisible] = useState(false);
  let [modalFunctionVisible, setModalFunctionVisible] = useState(false);
  let [modalLocationVisible, setModalLocationVisible] = useState(false);
  let [modalBioVisible, setModalBioVisible] = useState(false);
  let [modalPhoneVisible, setModalPhoneVisible] = useState(false);
  let [modalWebsiteVisible, setModalWebsiteVisible] = useState(false);
  let [notUsed, setNotUsed] = useState(false);
  let [refreshApps, setRefreshApps] = useState(Math.random())
  let [scrollEnabled, setScrollEnabled] = useState(true);

  // generic modals
  let [modalFacebook, setModalFacebook] = useState(false);
  let [modalInstagram, setModalInstagram] = useState(false);
  let [modalLinkedin, setModalLinkedin] = useState(false);
  let [modalMail, setModalMail] = useState(false);
  let [modalWhatsapp, setModalWhatsapp] = useState(false);
  let [modalAppstore, setModalAppstore] = useState(false);
  let [modalBehance, setModalBehance] = useState(false);
  let [modalCustomlink, setModalCustomlink] = useState(false);
  let [modalDrive, setModalDrive] = useState(false);
  let [modalDropbox, setModalDropbox] = useState(false);
  let [modalFlickr, setModalFlickr] = useState(false);
  let [modalGithub, setModalGithub] = useState(false);
  let [modalSnapchat, setModalSnapchat] = useState(false);
  let [modalStackoverflow, setModalStackoverflow] = useState(false);
  let [modalTripadvisor, setModalTripadvisor] = useState(false);
  let [modalTwitter, setModalTwitter] = useState(false);
  let [modalVimeo, setModalVimeo] = useState(false);
  let [modalYelp, setModalYelp] = useState(false);
  let [modalYoutube, setModalYoutube] = useState(false);
  let [modalAppleMusic, setModalAppleMusic] = useState(false);
  let [modalXing, setModalXing] = useState(false);
  let [modalAutoScout, setModalAutoScout] = useState(false);
  let [modalEventbrite, setModalEventbrite] = useState(false);
  let [modalFiverr, setModalFiverr] = useState(false);
  let [modalFreelancer, setModalFreelancer] = useState(false);
  let [modalMessenger, setModalMessenger] = useState(false);
  let [modalPayPal, setModalPayPal] = useState(false);
  let [modalReddit, setModalReddit] = useState(false);
  let [modalSignal, setModalSignal] = useState(false);
  let [modalSkype, setModalSkype] = useState(false);
  let [modalSlack, setModalSlack] = useState(false);
  let [modalSpotify, setModalSpotify] = useState(false);
  let [modalTeams, setModalTeams] = useState(false);
  let [modalTelegram, setModalTelegram] = useState(false);
  let [modalThreema, setModalThreema] = useState(false);
  let [modalTiktok, setModalTiktok] = useState(false);
  let [modalTwitch, setModalTwitch] = useState(false);
  let [modalUpwork, setModalUpwork] = useState(false);
  let [modalWeChat, setModalWeChat] = useState(false);
  let [modalWeTransfer, setModalWeTransfer] = useState(false);
  let [modalZoom, setModalZoom] = useState(false);

  let [pauze, setPauze] = useState(true);
  const [text, onChangeText] = React.useState("");
  const [importance, onChangeImportance] = React.useState("");
  const [slogan, setSlogan] = React.useState("");
  if (response) {
    if (response.response) {
      if (response.response == "no user found") {
        // alert("You are not a valid user plese contact our support team.");
        // setLoggedIn(false);
      } else {
        ob = response.response;
        //@ts-ignore
        id?.setName(ob.name);
      }
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => setPauze(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    setSlogan(slogans[getRandomInt(2)]);
  }, []);

  const { PostData } = useEditUser(userId.Id, ob);
  let links: any = [];
  links.push({
    link: ob?.facebook,
    importance: ob?.facebook_importance,
    social: "Facebook",
    startUrl: "https://www.facebook.com/",
    tip: "your name with a point in the middle",
    state: modalFacebook,
    setState: setModalFacebook,
    obPlace: "facebook",
  });
  links.push({
    link: ob?.instagram,
    importance: ob?.instagram_importance,
    social: "Instagram",
    startUrl: "https://www.instagram.com/",
    tip: "your username in one word",
    state: modalInstagram,
    setState: setModalInstagram,
    obPlace: "instagram",
  });
  links.push({
    link: ob?.linkedin,
    importance: ob?.linkedin_importance,
    social: "LinkedIn",
    startUrl: "https://www.linkedin.com/",
    tip: "your username in one word",
    state: modalLinkedin,
    setState: setModalLinkedin,
    obPlace: "linkedin",
  });
  links.push({
    link: ob?.mail,
    importance: ob?.mail_importance,
    social: "Mail",
    startUrl: "mailto:",
    tip: "just your email address",
    state: modalMail,
    setState: setModalMail,
    obPlace: "mail",
  });
  links.push({
    link: ob?.whatsapp,
    importance: ob?.whatsapp_importance,
    social: "WhatsApp",
    startUrl: "https://api.whatsapp.com/send?phone=",
    tip: "your phone number",
    state: modalWhatsapp,
    setState: setModalWhatsapp,
    obPlace: "whatsapp",
  });
  links.push({
    link: ob?.appstore,
    importance: ob?.appstore_importance,
    social: "AppStore",
    startUrl: "",
    tip: "Full link",
    state: modalAppstore,
    setState: setModalAppstore,
    obPlace: "appstore",
  });
  links.push({
    link: ob?.behance,
    importance: ob?.behance_importance,
    social: "Behance",
    startUrl: "https://www.behance.net/",
    tip: "your name without spaces",
    state: modalBehance,
    setState: setModalBehance,
    obPlace: "behance",
  });
  links.push({
    link: ob?.customlink,
    importance: ob?.customlink_importance,
    social: "Customlink",
    startUrl: "",
    tip: "full link",
    state: modalCustomlink,
    setState: setModalCustomlink,
    obPlace: "customlink",
  });
  links.push({
    link: ob?.drive,
    importance: ob?.drive_importance,
    social: "Drive",
    startUrl: "",
    tip: "full link",
    state: modalDrive,
    setState: setModalDrive,
    obPlace: "drive",
  });
  links.push({
    link: ob?.dropbox,
    importance: ob?.dropbox_importance,
    social: "Dropbox",
    startUrl: "",
    tip: "full link",
    state: modalDropbox,
    setState: setModalDropbox,
    obPlace: "dropbox",
  });
  links.push({
    link: ob?.flickr,
    importance: ob?.flickr_importance,
    social: "Flickr",
    startUrl: "",
    tip: "full link",
    state: modalFlickr,
    setState: setModalFlickr,
    obPlace: "flickr",
  });
  links.push({
    link: ob?.github,
    importance: ob?.github_importance,
    social: "GitHub",
    startUrl: "",
    tip: "full link",
    state: modalGithub,
    setState: setModalGithub,
    obPlace: "github",
  });
  links.push({
    link: ob?.snapchat,
    importance: ob?.snapchat_importance,
    social: "Snapchat",
    startUrl: "",
    tip: "full link",
    state: modalSnapchat,
    setState: setModalSnapchat,
    obPlace: "snapchat",
  });
  links.push({
    link: ob?.stackoverflow,
    importance: ob?.stackoverflow_importance,
    social: "Stackoverflow",
    startUrl: "",
    tip: "full link",
    state: modalStackoverflow,
    setState: setModalStackoverflow,
    obPlace: "stackoverflow",
  });
  links.push({
    link: ob?.tripadvisor,
    importance: ob?.tripadvisor_importance,
    social: "Tripadvisor",
    startUrl: "",
    tip: "full link",
    state: modalTripadvisor,
    setState: setModalTripadvisor,
    obPlace: "tripadvisor",
  });
  links.push({
    link: ob?.twitter,
    importance: ob?.twitter_importance,
    social: "Twitter",
    startUrl: "",
    tip: "full link",
    state: modalTwitter,
    setState: setModalTwitter,
    obPlace: "twitter",
  });
  links.push({
    link: ob?.vimeo,
    importance: ob?.vimeo_importance,
    social: "Vimeo",
    startUrl: "",
    tip: "full link",
    state: modalVimeo,
    setState: setModalVimeo,
    obPlace: "vimeo",
  });
  links.push({
    link: ob?.xing,
    importance: ob?.xing_importance,
    social: "Xing",
    startUrl: "",
    tip: "full link",
    state: modalXing,
    setState: setModalXing,
    obPlace: "xing",
  });
  links.push({
    link: ob?.yelp,
    importance: ob?.yelp_importance,
    social: "Yelp",
    startUrl: "",
    tip: "full link",
    state: modalYelp,
    setState: setModalYelp,
    obPlace: "yelp",
  });
  links.push({
    link: ob?.youtube,
    importance: ob?.youtube_importance,
    social: "YouTube",
    startUrl: "",
    tip: "full link",
    state: modalYoutube,
    setState: setModalYoutube,
    obPlace: "youtube",
  });
  links.push({
    link: ob?.appleMusic,
    importance: ob?.appleMusic_importance,
    social: "AppleMusic",
    startUrl: "",
    tip: "full link",
    state: modalAppleMusic,
    setState: setModalAppleMusic,
    obPlace: "appleMusic",
  });
  links.push({
    link: ob?.autoScout,
    importance: ob?.autoScout_importance,
    social: "AutoScout",
    startUrl: "",
    tip: "full link",
    state: modalAutoScout,
    setState: setModalAutoScout,
    obPlace: "autoScout",
  });
  links.push({
    link: ob?.eventbrite,
    importance: ob?.eventbrite_importance,
    social: "Eventbrite",
    startUrl: "",
    tip: "full link",
    state: modalEventbrite,
    setState: setModalEventbrite,
    obPlace: "eventbrite",
  });
  links.push({
    link: ob?.fiverr,
    importance: ob?.fiverr_importance,
    social: "Fiverr",
    startUrl: "",
    tip: "full link",
    state: modalFiverr,
    setState: setModalFiverr,
    obPlace: "fiverr",
  });
  links.push({
    link: ob?.freelancer,
    importance: ob?.freelancer_importance,
    social: "Freelancer",
    startUrl: "",
    tip: "full link",
    state: modalFreelancer,
    setState: setModalFreelancer,
    obPlace: "freelancer",
  });
  links.push({
    link: ob?.messenger,
    importance: ob?.messenger_importance,
    social: "Messenger",
    startUrl: "",
    tip: "full link",
    state: modalMessenger,
    setState: setModalMessenger,
    obPlace: "messenger",
  });
  links.push({
    link: ob?.payPal,
    importance: ob?.payPal_importance,
    social: "PayPal",
    startUrl: "",
    tip: "full link",
    state: modalPayPal,
    setState: setModalPayPal,
    obPlace: "payPal",
  });
  links.push({
    link: ob?.reddit,
    importance: ob?.reddit_importance,
    social: "Reddit",
    startUrl: "",
    tip: "full link",
    state: modalReddit,
    setState: setModalReddit,
    obPlace: "reddit",
  });
  links.push({
    link: ob?.signal,
    importance: ob?.signal_importance,
    social: "Signal",
    startUrl: "",
    tip: "full link",
    state: modalSignal,
    setState: setModalSignal,
    obPlace: "signal",
  });
  links.push({
    link: ob?.skype,
    importance: ob?.skype_importance,
    social: "Skype",
    startUrl: "",
    tip: "full link",
    state: modalSkype,
    setState: setModalSkype,
    obPlace: "skype",
  });
  links.push({
    link: ob?.slack,
    importance: ob?.slack_importance,
    social: "Slack",
    startUrl: "",
    tip: "full link",
    state: modalSlack,
    setState: setModalSlack,
    obPlace: "slack",
  });
  links.push({
    link: ob?.spotify,
    importance: ob?.spotify_importance,
    social: "Spotify",
    startUrl: "",
    tip: "full link",
    state: modalSpotify,
    setState: setModalSpotify,
    obPlace: "spotify",
  });
  links.push({
    link: ob?.teams,
    importance: ob?.teams_importance,
    social: "Teams",
    startUrl: "",
    tip: "full link",
    state: modalTeams,
    setState: setModalTeams,
    obPlace: "teams",
  });
  links.push({
    link: ob?.telegram,
    importance: ob?.telegram_importance,
    social: "Telegram",
    startUrl: "",
    tip: "full link",
    state: modalTelegram,
    setState: setModalTelegram,
    obPlace: "telegram",
  });
  links.push({
    link: ob?.threema,
    importance: ob?.threema_importance,
    social: "Threema",
    startUrl: "",
    tip: "full link",
    state: modalThreema,
    setState: setModalThreema,
    obPlace: "threema",
  });
  links.push({
    link: ob?.tiktok,
    importance: ob?.tiktok_importance,
    social: "Tiktok",
    startUrl: "",
    tip: "full link",
    state: modalTiktok,
    setState: setModalTiktok,
    obPlace: "tiktok",
  });
  links.push({
    link: ob?.twitch,
    importance: ob?.twitch_importance,
    social: "Twitch",
    startUrl: "",
    tip: "full link",
    state: modalTwitch,
    setState: setModalTwitch,
    obPlace: "twitch",
  });
  links.push({
    link: ob?.upwork,
    importance: ob?.upwork_importance,
    social: "Upwork",
    startUrl: "",
    tip: "full link",
    state: modalUpwork,
    setState: setModalUpwork,
    obPlace: "upwork",
  });
  links.push({
    link: ob?.weChat,
    importance: ob?.weChat_importance,
    social: "WeChat",
    startUrl: "",
    tip: "full link",
    state: modalWeChat,
    setState: setModalWeChat,
    obPlace: "weChat",
  });
  links.push({
    link: ob?.weTransfer,
    importance: ob?.weTransfer_importance,
    social: "WeTransfer",
    startUrl: "",
    tip: "full link",
    state: modalWeTransfer,
    setState: setModalWeTransfer,
    obPlace: "weTransfer",
  });
  links.push({
    link: ob?.zoom,
    importance: ob?.zoom_importance,
    social: "Zoom",
    startUrl: "",
    tip: "full link",
    state: modalZoom,
    setState: setModalZoom,
    obPlace: "zoom",
  });
  links.sort(function (a: any, b: any) {
    let compare1, compare2;
    if (a.importance == null || a.importance == 0) {
      compare1 = Infinity;
    } else {
      compare1 = a.importance;
    }
    if (b.importance == null || b.importance == 0) {
      compare2 = Infinity;
    } else {
      compare2 = b.importance;
    }

    return compare1 - compare2;
  });

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled) {
      let temp = ob;
      //@ts-ignore
      temp.directlink = null;
      setOb(temp);
      PostData();
    } else {
      let temp = ob;
      //@ts-ignore
      temp.directlink = links[0].link;
      setOb(temp);
      PostData();
    }
  };
  // image picker
  const [image, setImage] = useState<any>();

  useEffect(() => {
    if (ob?.directlink != null) {
      setIsEnabled(true);
    }
    if (ob) {
      PostData();
    }
  }, [ob]);

  useEffect(() => {
    if (isEnabled && links) {
      let temp = ob;
      if (links[0]) {
        //@ts-ignore
        temp.directlink = links[0]?.link;
      }
      setOb(temp);
      PostData();
    }
  }, [links]);

  //@ts-ignore
  useEffect(async () => {
    if (ob) {
      var formdata = new FormData();
      formdata.append(
        "profile",
        { name: ob?.rowKey + ".jpg", uri: image, type: "image/*" },
        "[PROXY]"
      );
      formdata.append("name", ob?.rowKey + ".jpg");

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      fetch(
        "https://dotdbelgium.azurewebsites.net/api/uploadprofile?code=CEs4SUZh6AIcquNwv0yYhNas6NLgBIP9nFfzGwt5x1uDSvFWF1vWdw==",
        //@ts-ignore
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          setReload("iets");
          setReload("anders");
        })
        .catch((error) => console.log("error", error));
      ob.picture =
        "https://dotdstorage.blob.core.windows.net/profile/" +
        ob?.rowKey +
        ".jpg";
      setOb(ob);
      PostData();
    }
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.05,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // image picker
  const [companyImage, setCompanyImage] = useState<any>();

  //@ts-ignore
  useEffect(async () => {
    if (ob) {
      var formdata = new FormData();
      formdata.append(
        "profile",
        { name: ob?.rowKey + ".jpg", uri: companyImage, type: "image/*" },
        "[PROXY]"
      );
      formdata.append("name", ob?.rowKey + ".jpg");

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      fetch(
        "https://dotdbelgium.azurewebsites.net/api/uploadCompany?code=EEacxI5TRkGLAskCRZ7hCmaD5nrt3yHCO3N8/GnxdRCVKhHuPkGWtw==",
        //@ts-ignore
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          setReload("iets");
          setReload("anders");
        })
        .catch((error) => console.log("error", error));
      ob.companypicture =
        "https://dotdstorage.blob.core.windows.net/company/" +
        ob?.rowKey +
        ".jpg";
      setOb(ob);
      PostData();
    }
  }, [companyImage]);

  const pickImageCompany = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.05,
    });

    if (!result.cancelled) {
      setCompanyImage(result.uri);
    }
  };

  // image picker
  const [coverImage, setCoverImage] = useState<any>();

  //@ts-ignore
  useEffect(async () => {
    if (ob) {
      var formdata = new FormData();
      formdata.append(
        "profile",
        { name: ob?.rowKey + ".jpg", uri: coverImage, type: "image/*" },
        "[PROXY]"
      );
      formdata.append("name", ob?.rowKey + ".jpg");

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      fetch(
        "https://dotdbelgium.azurewebsites.net/api/uploadCover?code=sgLsJ0QmquGYFaGNMIKZrxjGhNvVD0td1gCmfRU5PIjeAhPF8C4Lug==",
        //@ts-ignore
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          setReload("iets");
          setReload("anders");
        })
        .catch((error) => console.log("error", error));
      let temp = ob;
      temp.coverpicture =
        "https://dotdstorage.blob.core.windows.net/cover/" +
        ob?.rowKey +
        ".jpg";
      setOb(temp);
      PostData();
    }
  }, [coverImage]);

  useEffect(() => {
    if (status?.granted == false) {
      requestPermission();
    }
  }, []);

  const pickImageCover = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [8, 4],
      quality: 0.05,
    });

    if (!result.cancelled) {
      setCoverImage(result.uri);
    }
  };

  //@ts-ignore
  const renderItem = ({ item }) => {
    return (
      <View style={{marginLeft: 5, marginRight: 5}}>
      <AppSquare
        importance={ob ? ob[item.obPlace + "_importance"] : ""}
        name={item.social}
        onChangeImportance={onChangeImportance}
        onChangeText={onChangeText}
        setState={item.setState}
        state={item.state}
        text={ob ? ob[item.obPlace].replace(item.startUrl, "") : ""}
        otherModal={setNotUsed}
        smallStyle={true}
        setRefreshApps={setRefreshApps}
        startUrl={item.startUrl}
      ></AppSquare>
      </View>
    );
  };

 
  return (
    <ScrollView scrollEnabled={scrollEnabled}>
      <Modal animationType="slide" transparent={true} visible={pauze}>
      <SafeAreaView style={[styles.container,{backgroundColor:"#052846"}]}>
      <Image
        source={{
          uri: "https://dotdstorage.blob.core.windows.net/logos/login3.png",
        }}
        style={{ width: "100%", height: 150, marginTop: 170}}
      ></Image>
      <Text
        style={{
          color: "white",
          opacity: 50,
          fontSize: 20,
          marginBottom: 5,
          marginTop: 150
        }}
      >
        Preparing your profile as we speak.
      </Text>
    </SafeAreaView>
      </Modal>

      {ob != undefined && (
        <View style={styles.container}>
          {/* name, function locatie bio */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalNameVisible}
            onRequestClose={() => {
              setModalNameVisible(!modalNameVisible);
            }}
          >
            <Pressable
              onPress={() => setModalNameVisible(!modalNameVisible)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <Pressable onPress={() => {}} style={styles.modalView}>
                <Text style={styles.modalText}>Edit name</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={onChangeText}
                  value={text}
                />
                <View style={styles.modalButtons}>
                  <Pressable
                    style={[styles.button]}
                    onPress={() => setModalNameVisible(!modalNameVisible)}
                  >
                    <Text style={[styles.textStyle, , styles.buttonCancel]}>
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonSave]}
                    onPress={() => {
                      setModalNameVisible(!modalNameVisible);
                      ob.name = text;
                      setOb(ob);
                      PostData();
                    }}
                  >
                    <Text style={styles.textStyle}>Save</Text>
                  </Pressable>
                </View>
              </Pressable>
            </Pressable>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalFunctionVisible}
            onRequestClose={() => {
              setModalFunctionVisible(!modalFunctionVisible);
            }}
          >
            <Pressable
              onPress={() => setModalFunctionVisible(!modalFunctionVisible)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <Pressable onPress={() => {}} style={styles.modalView}>
                <Text style={styles.modalText}>Edit function</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={onChangeText}
                  value={text}
                />
                <View style={styles.modalButtons}>
                  <Pressable
                    style={[styles.button]}
                    onPress={() =>
                      setModalFunctionVisible(!modalFunctionVisible)
                    }
                  >
                    <Text style={[styles.textStyle, styles.buttonCancel]}>
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonSave]}
                    onPress={() => {
                      setModalFunctionVisible(!modalFunctionVisible);
                      ob.function = text;
                      setOb(ob);
                      PostData();
                    }}
                  >
                    <Text style={styles.textStyle}>Save</Text>
                  </Pressable>
                </View>
              </Pressable>
            </Pressable>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalLocationVisible}
            onRequestClose={() => {
              setModalLocationVisible(!modalLocationVisible);
            }}
          >
            <Pressable
              onPress={() => setModalLocationVisible(!modalLocationVisible)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <Pressable onPress={() => {}} style={styles.modalView}>
                <Text style={styles.modalText}>Edit location</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={onChangeText}
                  value={text}
                />
                <View style={styles.modalButtons}>
                  <Pressable
                    style={[styles.button]}
                    onPress={() =>
                      setModalLocationVisible(!modalLocationVisible)
                    }
                  >
                    <Text style={[styles.textStyle, , styles.buttonCancel]}>
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonSave]}
                    onPress={() => {
                      setModalLocationVisible(!modalLocationVisible);
                      ob.location = text;
                      setOb(ob);
                      PostData();
                    }}
                  >
                    <Text style={styles.textStyle}>Save</Text>
                  </Pressable>
                </View>
              </Pressable>
            </Pressable>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalBioVisible}
            onRequestClose={() => {
              setModalBioVisible(!modalBioVisible);
            }}
          >
            <Pressable
              onPress={() => setModalBioVisible(!modalBioVisible)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <Pressable onPress={() => {}} style={styles.modalView}>
                <Text style={styles.modalText}>Edit bio</Text>
                <TextInput
                  style={[styles.textInput, { height: 100 }]}
                  numberOfLines={4}
                  multiline={true}
                  onChangeText={onChangeText}
                  value={text}
                  textAlign={"left"}
                  textAlignVertical={"top"}
                />
                <View style={styles.modalButtons}>
                  <Pressable
                    style={[styles.button]}
                    onPress={() => setModalBioVisible(!modalBioVisible)}
                  >
                    <Text style={[styles.textStyle, styles.buttonCancel]}>
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonSave]}
                    onPress={() => {
                      setModalBioVisible(!modalBioVisible);
                      ob.bio = text;
                      setOb(ob);
                      PostData();
                    }}
                  >
                    <Text style={styles.textStyle}>Save</Text>
                  </Pressable>
                </View>
              </Pressable>
            </Pressable>
          </Modal>
          {/* website en telefoonnummer */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalPhoneVisible}
            onRequestClose={() => {
              setModalPhoneVisible(!modalPhoneVisible);
            }}
          >
            <Pressable
              onPress={() => setModalPhoneVisible(!modalPhoneVisible)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <Pressable onPress={() => {}} style={styles.modalView}>
                <Text style={styles.modalText}>Edit phonenumber</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={onChangeText}
                  value={text}
                  keyboardType="numeric"
                />
                <View style={styles.modalButtons}>
                  <Pressable
                    style={[styles.button]}
                    onPress={() => setModalPhoneVisible(!modalPhoneVisible)}
                  >
                    <Text style={[styles.textStyle, styles.buttonCancel]}>
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonSave]}
                    onPress={() => {
                      setModalPhoneVisible(!modalPhoneVisible);
                      ob.phone = text;
                      setOb(ob);
                      PostData();
                    }}
                  >
                    <Text style={styles.textStyle}>Save</Text>
                  </Pressable>
                </View>
              </Pressable>
            </Pressable>
          </Modal>
          {/* not used app Modal modals */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={notUsed}
            onRequestClose={() => {
              setNotUsed(!notUsed);
            }}
          >
            <Pressable
              onPress={() => setNotUsed(!notUsed)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <Pressable
                onPress={() => {}}
                style={[styles.modalView, { width: 350 }]}
              >
                <View
                  style={[
                    {
                      width: 325,
                      justifyContent: "space-between",
                      alignItems: "stretch",
                      display: "flex",
                      height: 500,
                      flexDirection: "column",
                      flexWrap: "wrap",
                      marginLeft: 26,
                    },
                  ]}
                >
                  <FlatList
                  //@ts-ignore
                    data={links.filter(e => e.link == "")}
                    // renderItem={renderItem}
                    //@ts-ignore
                    keyExtractor={(item) => item.obPlace}
                    //@ts-ignore
                    renderItem={renderItem}
                    numColumns={3}
                  />
                  {/* {links.map((e: any) => {
                    if (e.link == "") {
                      return (
                        <AppSquare
                          importance={ob ? ob[e.obPlace + "_importance"] : ""}
                          name={e.social}
                          onChangeImportance={onChangeImportance}
                          onChangeText={onChangeText}
                          setState={e.setState}
                          state={e.state}
                          text={ob ? ob[e.obPlace].replace(e.startUrl, "") : ""}
                          otherModal={setNotUsed}
                          smallStyle={true}
                        ></AppSquare>
                      );
                    }
                  })} */}
                </View>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonSave,
                    { width: 100, marginBottom: -20, marginTop: 10 },
                  ]}
                  onPress={() => setNotUsed(!notUsed)}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    close
                  </Text>
                </Pressable>
              </Pressable>
            </Pressable>
          </Modal>
          {/* generic modal for applications */}
          {links.map((e: any) => {
            return (
              <GenericModal
                tip={e.tip}
                obPlace={e.obPlace}
                startUrl={e.startUrl}
                id={userId.id}
                importance={importance}
                name={e.social}
                ob={ob}
                onChangeImportance={onChangeImportance}
                onChangeText={onChangeText}
                setOb={setOb}
                setState={e.setState}
                state={e.state}
                text={text}
                postData={PostData}
                setRefreshApps={setRefreshApps}
              ></GenericModal>
            );
          })}
          <Pressable
            hitSlop={{ bottom: -100 }}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
            onPress={() => {
              if (status?.granted) {
                pickImageCover();
              } else {
                alert(
                  "We don't have permission to acces your pictures please change this in your settings."
                );
                requestPermission();
              }
            }}
          >
            <Image
              key={reload}
              style={styles.cover}
              source={{
                uri:
                  ob?.coverpicture == ""
                    ? "https://dotdstorage.blob.core.windows.net/logos/empty_desktop.png"
                    : ob?.coverpicture + "?" + new Date(),
              }}
            />
          </Pressable>
          <Pressable
            hitSlop={50}
            style={{ zIndex: 1 }}
            onPress={() => {
              if (status?.granted) {
                pickImage();
              } else {
                alert(
                  "We don't have permission to acces your pictures please change this in your settings."
                );
                requestPermission();
              }
            }}
          >
            <Image
              key={reload}
              style={styles.profile}
              source={{
                uri:
                  ob?.picture == ""
                    ? "https://dotdstorage.blob.core.windows.net/logos/empty_profile.png"
                    : ob?.picture + "?" + new Date(),
              }}
            />
          </Pressable>
          <Pressable
            hitSlop={{ left: -150 }}
            style={{ zIndex: 2 }}
            onPress={() => {
              if (status?.granted) {
                pickImageCompany();
              } else {
                alert(
                  "We don't have permission to acces your pictures please change this in your settings."
                );
                requestPermission();
              }
            }}
          >
            <Image
              key={reload}
              style={styles.companyPicture}
              source={{
                uri:
                  ob?.companypicture == ""
                    ? "https://dotdstorage.blob.core.windows.net/logos/empty_company.png"
                    : ob?.companypicture + "?" + new Date(),
              }}
            />
          </Pressable>

          <Pressable
            onPress={() => {
              setModalNameVisible(!modalNameVisible);
              onChangeText(ob.name);
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              {ob?.name == "" ? "name" : ob?.name}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setModalFunctionVisible(!modalFunctionVisible);
              onChangeText(ob.function);
            }}
          >
            <Text style={{ fontSize: 17 }}>
              {ob?.function == "" ? "function" : ob?.function}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setModalLocationVisible(!modalLocationVisible);
              onChangeText(ob.location);
            }}
          >
            <Text style={{ fontSize: 12, marginBottom: 10 }}>
              {ob?.location == "" ? "location" : ob?.location}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setModalBioVisible(!modalBioVisible);
              onChangeText(ob.bio);
            }}
          >
            <Text style={{ fontSize: 16, width: 300, textAlign: "center" }}>
              {ob?.bio == "" ? "bio" : ob?.bio}
            </Text>
          </Pressable>
          <View style={styles.contactWebiste}>
            <Pressable
              onPress={() => {
                setModalPhoneVisible(!modalPhoneVisible);
                onChangeText(ob.phone);
              }}
              style={styles.contactButton}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                Add to contacts
              </Text>
            </Pressable>
          </View>
          {/* apps */}
          <FavoriteSquare
            importance={ob ? ob[links[0].obPlace + "_importance"] : ""}
            name={links[0].social}
            onChangeImportance={onChangeImportance}
            onChangeText={onChangeText}
            setState={links[0].setState}
            state={links[0].state}
            text={ob ? ob[links[0].obPlace].replace(links[0].startUrl, "") : ""}
            isEnabled={isEnabled}
            toggleSwitch={toggleSwitch}
          ></FavoriteSquare>
          <View style={styles.links} key={refreshApps}>
          <Ionicons
                name="checkmark-circle"
                size={30}
                color="#052846"
                style={{ position: "absolute", top: 47, left: 88, zIndex: 20, marginTop: -30 }}
              />
            {//@ts-ignore
              <DragDrop info={links.filter((e:any) => e.link != "")} onChangeText={onChangeText} onChangeImportance={onChangeImportance} postData={PostData} links={links} ob={ob} setOb={setOb} refreshApps={refreshApps} setScrollEnabled={setScrollEnabled}></DragDrop>
            }
            
          </View>
          <View style={[styles.links,{marginLeft: 60, marginTop: 20}]}>

          <Pressable onPress={() => setNotUsed(true)}>
              <Svg.SvgUri
                width="75"
                height="75"
                style={{ borderRadius: 20, overflow: "hidden" }}
                uri="https://dotdstorage.blob.core.windows.net/logos/add.svg"
              />
              <Text style={{ textAlign: "center", marginTop: 10 }}>Add</Text>
            </Pressable>
            </View>
          {/* <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 60,
            height: 200,
          }}
        >
          <Text>Powered by:</Text>
          <Svg.SvgUri
            style={{ width: 50, height: 20 }}
            width="35%"
            height="35%"
            uri="https://dotdstorage.blob.core.windows.net/logos/dotd.svg"
          />
          <Text>The science of networking.</Text>
        </View> */}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingBottom: 100,
    paddingTop: 50,
  },
  cover: {
    marginTop: 10,
    width: "95%",
    height: 200,
    borderRadius: 10,
  },
  profile: {
    height: 150,
    width: 150,
    borderRadius: 75,
    margin: -80,
    borderWidth: 5,
    borderColor: "white",
  },
  companyPicture: {
    height: 75,
    width: 75,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 50,
    marginLeft: 125,
    marginTop: 20,
  },
  globe: {
    height: 20,
    width: 20,
  },
  site: {
    height: 40,
    width: 40,
    marginTop: 10,
  },
  favorite: {},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  contactWebiste: {
    justifyContent: "center",
    marginBottom: 40,
    marginTop: 40,
    alignItems: "center",
    // width: 600
  },
  links: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 380,
    // marginLeft: 26,
    // height: 500,
    // justifyContent: "flex-start",
    // alignContent: "flex-start",
  },
  contactButton: {
    height: 40,
    width: 350,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: 260,
    marginTop: 15,
    marginBottom: -20,
  },
  buttonCancel: {
    color: "#7b9cac",
    textDecorationLine: "underline",
  },
  buttonSave: {
    backgroundColor: "#052846",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: -5,
    textAlign: "left",
    width: 250,
    marginTop: 10,
    marginLeft: 30,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
    borderRadius: 20,
  },
});
