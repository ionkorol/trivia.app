import { extendTheme } from "native-base";
import { backgroundColor } from "styled-system";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  colors: {
    primary: {
      50: "#defff5",
      100: "#b4fae3",
      200: "#88f5d1",
      300: "#5bf1bf",
      400: "#31edad",
      500: "#1bd393",
      600: "#0ea473",
      700: "#037552",
      800: "#004730",
      900: "#00190e",
    },
    secondary: {
      50: "#d9f9ff",
      100: "#ade7ff",
      200: "#7fd6fd",
      300: "#4fc6fa",
      400: "#21b5f7",
      500: "#089cde",
      600: "#0079ad",
      700: "#00577d",
      800: "#00354e",
      900: "#001320",
    },
  },
  components: {
    Button: {
      variants: {
        solid: (props) => ({
          borderColor: `${props.colorScheme}.400`,
          borderWidth: 2,
          _text: {
            color: "white",
          },
        }),
        outline: (props) => ({
          borderColor: `muted.200`,
          bg: "white",
          borderWidth: 2,

          _text: {
            color: "muted.500",
          },
        }),
        unstyled: {
          padding: 0,
        },
      },
      defaultProps: {
        size: "lg",
        shadow: 3,
        colorScheme: "primary",
      },
      baseStyle: (props) => ({
        borderRadius: 100,
        _text: {
          fontFamily: "Baloo2_700Bold",
        },
      }),
    },
    Text: {
      baseStyle: {
        fontFamily: "Baloo2_400Regular",
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: "Baloo2_700Bold",
      },
    },
    Input: {
      variants: {
        filled: {
          backgroundColor: "muted.200",
          placeholderTextColor: "muted.400",

          shadow: 3,
          color: "muted.700",
        },
        unstyled: {
          placeholderTextColor: "muted.300",
        },
      },
      baseStyle: {
        borderRadius: 50,
        fontFamily: "Baloo2_400Regular",
      },
      defaultProps: {
        size: "xl",
        variant: "filled",
      },
    },
    Alert: {
      variants: {
        subtle: {
          backgroundColor: "#00000000",
        },
      },
      defaultProps: {
        variant: "subtle",
      },
    },
  },
});

export default theme;
