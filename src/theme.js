import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    heading: '"Outfit", system-ui, sans-serif',
    body: '"DM Sans", system-ui, sans-serif',
  },
  colors: {
    brand: {
      50: "#e6f7ff",
      100: "#b3e5fc",
      200: "#81d4fa",
      300: "#4fc3f7",
      400: "#29b6f6",
      500: "#03a9f4",
      600: "#039be5",
      700: "#0288d1",
      800: "#0277bd",
      900: "#01579b",
    },
    surface: {
      950: "#05080d",
      900: "#0a0f18",
      800: "#111827",
      700: "#1a2332",
    },
  },
  styles: {
    global: {
      body: {
        bg: "surface.950",
        color: "gray.100",
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "brand",
      },
    },
  },
});
