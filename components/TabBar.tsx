import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
} from "react-native";

const S = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 54,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 10,
    backgroundColor: "rgba(233,233,233,0.85)",
    borderRadius: 50,
    justifyContent: "center",
  },
  tabButton: { flex: 1, justifyContent: "center", alignItems: "center" },
  activeTab: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabInner: {
    width: 48,
    height: 48,
    backgroundColor: "#0156FE",
    borderRadius: 24,
  },
});

const TabBar = (props: any) => {
  const {
    renderIcon,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
  } = props;

  const { routes, index: activeRouteIndex } = navigation.state;
  const totalWidth = Dimensions.get("window").width - 40;
  const tabWidth = totalWidth / routes.length;

  const [translateValue] = useState(new Animated.Value(tabWidth));

  const onTabBarPress = (route: any, routeIndex: any) => {
    onTabPress(route); // function that will change the route;
    Animated.spring(translateValue, {
      toValue: routeIndex * tabWidth,
      // The translateX value should change depending on the chosen route
      velocity: 10,
      useNativeDriver: true,
    }).start(); // the animation that animates the active tab circle
  };

  return (
    <SafeAreaView>
      <View style={S.container}>
        <View>
          <View style={StyleSheet.absoluteFillObject}>
            <View style={[S.activeTab, { width: tabWidth }]}>
              <Animated.View
                style={[
                  S.activeTab,
                  {
                    width: tabWidth,
                    transform: [{ translateX: translateValue }],
                  },
                ]}
              >
                <View style={S.activeTabInner} />
              </Animated.View>
            </View>
          </View>
        </View>
        {routes.map((route: any, routeIndex: any) => {
          const isRouteActive = routeIndex === activeRouteIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

          return (
            <TouchableOpacity
              key={routeIndex}
              style={S.tabButton}
              onPress={() => {
                onTabBarPress({ route }, routeIndex);
              }}
              onLongPress={() => {
                onTabLongPress({ route });
              }}
              accessibilityLabel={getAccessibilityLabel({ route })}
            >
              {renderIcon({ route, focused: isRouteActive, tintColor })}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default TabBar;
