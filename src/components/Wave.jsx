import React, { Children } from "react";
import { View, Dimensions } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

const Ripple = ({ onPress, backgroundColor, children }) => {
  const child = Children.only(children);
  return child;
};

export default Ripple;
