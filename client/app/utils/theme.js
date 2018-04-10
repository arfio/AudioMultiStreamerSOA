import { createMuiTheme } from "material-ui";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#ccc",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
    },
  },
});
export default theme;