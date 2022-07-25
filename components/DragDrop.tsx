import React, { createRef } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { AnySizeDragSortableView } from "react-native-drag-sort";
import { color } from "react-native-reanimated";
import AppSquare from "./AppSquare";

const { width } = Dimensions.get("window");
const headerViewHeight = 160;
const bottomViewHeight = 40;

const getW = (importance: any, isWidth: any) =>
  isWidth ? (importance % 3 === 0 ? width - 40 : (width - 60) / 2) : 80;
// const getW = (index, isWidth) => 120 + Math.floor((Math.random() - 0.5) * 100);
// const getW = (index, isWidth) => 150;

export default class DragDrop extends React.Component {
  constructor(props: any) {
    super(props);
    const items = [];
    for (let i = 0; i < 26; i++) {
      items.push({
        text: String.fromCharCode(65 + i),
        width: getW(i, true),
        height: getW(i, false),
      });
    }
    this.state = {
      items,
      movedKey: null,
      info: props.info,
    };

    //@ts-ignore
    this.sortableViewRef = createRef();
  }

  onDeleteItem = (item: any, importance: any) => {
    //@ts-ignore
    const items = [...this.state.items];
    items.splice(importance, 1);
    this.setState({ items });
  };

  _renderItem = (item: any, importance: any, isMoved: any) => {
    //@ts-ignore
    const { movedKey } = this.state;
    return (
      <TouchableOpacity
        onLongPress={() => {
          //@ts-ignore
          this.props.setScrollEnabled(false);
          this.setState({ movedKey: item.obPlace });
          //@ts-ignore
          this.sortableViewRef.current.startTouch(item, importance);
        }}
        //@ts-ignore
        onPressOut={() => {
          //@ts-ignore
          this.sortableViewRef.current.onPressOut();
          //@ts-ignore
          this.props.setScrollEnabled(true);
        }}
        onPress={() => {
          //@ts-ignore
          if (this.props.setNotUsed) {
            //@ts-ignore
            this.props.setNotUsed(false);
          }
          //@ts-ignore
          item.setState(true);
          //@ts-ignore
          this.props.onChangeText(item.link);
          //@ts-ignore
          this.props.onChangeImportance(item.importance);
        }}
      >
        <View
          style={[
            styles.item_wrap,
            { opacity: movedKey === item.obPlace && !isMoved ? 1 : 1 },
            { backgroundColor: "#fff" },
          ]}
        >
          {
            <View>
              <TouchableOpacity
                onPress={() => this.onDeleteItem(item, importance)}
              >
                {/* <Image
                  source={require("../assets/splash.png")}
                  style={styles.item_clear}
                /> */}
                <View style={[{ marginLeft: 5, marginRight: 5 }]}>
                  {/* <AppSquare
                    importance={item.importance}
                    name={item.social}
                    //@ts-ignore
                    onChangeImportance={this.props.onChangeImportance}
                    //@ts-ignore
                    onChangeText={this.props.onChangeText}
                    setState={item.setState}
                    state={item.state}
                    text={item.obPlace}
                    //@ts-ignore
                    otherModal={this.props.setNotUsed}
                    smallStyle={false}
                  ></AppSquare> */}
                </View>
              </TouchableOpacity>
            </View>
          }
          <View
            style={[
              {
                width: item.width,
                height: item.height,
              },
            ]}
          >
            {/* isMoved ? (
              <View style={styles.item_icon_swipe}>
                {/* <Image source={require('../assets/splash.png')} style={styles.item_icon}/> */}
            {/* <View style={[{ marginLeft: 5, marginRight: 5 }]}>
                  <AppSquare
                    importance={item.importance}
                    name={item.social}
                    //@ts-ignore
                    onChangeImportance={this.props.onChangeImportance}
                    //@ts-ignore
                    onChangeText={this.props.onChangeText}
                    setState={item.setState}
                    state={item.state}
                    text={item.obPlace}
                    //@ts-ignore
                    otherModal={this.props.setNotUsed}
                    smallStyle={false}
                  ></AppSquare>
                </View>
              </View>
            ) : null} */}
            <View
              style={{
                width: 100,
                height: 120,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  width: 75,
                  height: 75,
                  marginBottom: 10,
                }}
                source={{
                  uri:
                    "https://dotdstorage.blob.core.windows.net/logos/" +
                    item.social +
                    "-Icon.png",
                }}
              />
              <Text>{item.social}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    // //@ts-ignore
    // const { items } = this.state;
    // const renderHeaderView = (
    //   <View style={styles.aheader}>
    //     <Image
    //       source={{
    //         uri: "https://avatars0.githubusercontent.com/u/15728691?s=460&v=4",
    //       }}
    //       style={styles.aheader_img}
    //     />
    //     <View style={styles.aheader_context}>
    //       <Text style={styles.aheader_title}>mochixuan</Text>
    //       <Text style={styles.aheader_desc}>
    //         Android, React-Native, Flutter, React, Web。Learn new knowledge and
    //         share new knowledge.
    //       </Text>
    //     </View>
    //   </View>
    // );
    // const renderBottomView = (
    //   <View style={styles.abottom}>
    //     <Text style={styles.abottom_desc}>yarn add react-native-drag-sort</Text>
    //   </View>
    // );
    return (
      <SafeAreaView style={{ backgroundColor: "#fff" }}>
        {
          //@ts-ignore
          <AnySizeDragSortableView
            //@ts-ignore
            key={this.props.refreshApps}
            //@ts-ignore
            ref={this.sortableViewRef}
            //@ts-ignore
            dataSource={this.state.info}
            keyExtractor={(item) => item.importance}
            renderItem={this._renderItem}
            onDataChange={(data, callback) => {
              let test = data;
              for (let i in test) {
                //@ts-ignore
                this.props.links.filter(
                  (e: any) => e.social == test[i].social
                )[0].importance = +i + 1;
                //@ts-ignore
                let temp = this.props.ob;
                //@ts-ignore
                temp[
                  //@ts-ignore
                  this.props.links.filter(
                    (e: any) => e.social == test[i].social
                  )[0].obPlace + "_importance"
                ] = +i + 1;
                //@ts-ignore

                this.props.setOb(temp);
                //@ts-ignore

                this.props.postData();
              }
              this.setState({ info: data }, () => {
                callback();
              });
              // //@ts-ignore
              // setTimeout(
              //   //@ts-ignore
              //   () => console.log(this.props.ob, "dit hier enal skrrrr"),
              //   500
              // );
            }}
            // renderHeaderView = {renderHeaderView}
            // headerViewHeight={headerViewHeight}
            // renderBottomView = {renderBottomView}
            // bottomViewHeight={bottomViewHeight}
            // movedWrapStyle={styles.item_moved}
            onDragEnd={() => {
              this.setState({
                movedKey: null,
              });
            }}
          />
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  item_wrap: {
    position: "relative",
    paddingLeft: 20,
    paddingTop: 20,
  },
  // item: {
  //   justifyContent: "space-around",
  //   alignItems: "center",
  //   backgroundColor: "#fff",
  //   borderRadius: 4,
  // },
  // item_clear_wrap: {
  //   position: "absolute",
  //   left: 10,
  //   top: 10,
  //   width: 20,
  //   height: 20,
  //   zIndex: 999,
  // },
  // item_clear: {
  //   width: 20,
  //   height: 20,
  // },
  // item_moved: {
  //   opacity: 0.95,
  //   borderRadius: 4,
  // },
  // item_icon_swipe: {
  //   width: 50,
  //   height: 50,
  //   backgroundColor: "#fff",
  //   borderRadius: 50 * 0.5,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // item_icon: {
  //   width: 30,
  //   height: 30,
  //   resizeMode: "contain",
  // },
  // item_text_swipe: {
  //   // backgroundColor: "#fff",
  //   width: 56,
  //   height: 30,
  //   borderRadius: 15,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // item_text: {
  //   // color: "#444",
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  // header: {
  //   height: 48,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   // borderBottomColor: "#2ecc71",
  //   borderBottomWidth: 2,
  // },
  // header_title: {
  //   color: "#333",
  //   fontSize: 24,
  //   fontWeight: "bold",
  // },
  // aheader: {
  //   height: headerViewHeight,
  //   flexDirection: "row",
  //   // borderBottomColor: "#2ecc71",
  //   borderBottomWidth: 2,
  //   zIndex: 100,
  //   backgroundColor: "#fff",
  // },
  // aheader_img: {
  //   width: headerViewHeight * 0.6,
  //   height: headerViewHeight * 0.6,
  //   resizeMode: "cover",
  //   borderRadius: headerViewHeight * 0.3,
  //   marginLeft: 16,
  //   marginTop: 10,
  // },
  // aheader_context: {
  //   marginLeft: 8,
  //   height: headerViewHeight * 0.4,
  //   marginTop: 10,
  // },
  // aheader_title: {
  //   color: "#333",
  //   fontSize: 20,
  //   marginBottom: 10,
  //   fontWeight: "bold",
  // },
  // aheader_desc: {
  //   color: "#444",
  //   fontSize: 16,
  //   width: width - headerViewHeight * 0.6 - 32,
  // },
  // abottom: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: bottomViewHeight,
  //   backgroundColor: "#fff",
  //   zIndex: 100,
  //   // borderTopColor: "#2ecc71",
  //   borderTopWidth: 2,
  // },
  // abottom_desc: {
  //   color: "#333",
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
});
