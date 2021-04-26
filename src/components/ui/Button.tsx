import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "style";

interface Props {
  onPress?: () => any;
  disabled?: boolean;
  outline?: boolean;
}
const Button: React.FC<Props> = (props) => {
  const { onPress, disabled, outline } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={outline ? styles.outlineContainer : styles.container}
    >
      <Text style={{ ...styles.text }}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.secondary,
  },
  outlineContainer: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.secondary,
  },
  disabled: {
    borderColor: "gray",
    backgroundColor: "gray",
  },

  text: {
    color: colors.light,
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
