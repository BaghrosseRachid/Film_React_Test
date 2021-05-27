import React,{useState} from 'react'
import style from "../assets/style.module.css";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import { makeStyles } from "@material-ui/core/styles";
import { RiMovie2Line } from "react-icons/ri";

import {
  Switch,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Typography,
} from "@material-ui/core";


const useStyles = makeStyles({
  // This group of buttons will be aligned to the right
  rightToolbar: {
    marginLeft: "auto",
    marginRight: 10,
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
});

export default function Header({setDark}) {
  const [darkMode, setDarkMode] = useState(false);

  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  
  return (
    <div className={style.searchContainer}>
      <AppBar position="static">
        <ToolBar>
          <RiMovie2Line size={50} />
          {
            //<Typography variant="h3">Movies and Series</Typography>
          }
          <section className={classes.rightToolbar}>
          
          </section>
          <ThemeProvider theme={theme}>
            <CssBaseline />
         <i><Typography variant="h6">
           {darkMode ? 'Light Mode' : 'Dark Mode'}
         </Typography></i>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </ThemeProvider>
        </ToolBar>
      </AppBar>
    </div>
  );
}
