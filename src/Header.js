import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import style from "./assets/style.module.css";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/core/Menu";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import SettingsBrightnessIcon from "@material-ui/icons/SettingsBrightness";
import {
  Paper,
  Switch,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";
const initialState = {
  typedInMovieTitle: "",
  movies: [],
  isLoading: false,
  isError: false,
};
//à mettre à part dans un d
const ACTION = {
  TYPE_SEARCH: "TYPE_SEARCH",
  FETCH_DATA: "FETCH_DATA",
  FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAIL: "FETCH_DATA_FAIL",
};

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
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.TYPE_SEARCH:
      return {
        ...state,
        typedInMovieTitle: action.value,
      };
    case ACTION.FETCH_DATA:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case ACTION.FETCH_DATA_SUCCESS:
      return {
        ...state,
        movies: action.value,
        isLoading: false,
        isError: false,
      };

    case ACTION.FETCH_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default function Header({ setMoviesOfAppComponent }) {
  const [darkMode, setDarkMode] = useState(false);

  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  function onChange(event) {
    dispatch({
      type: ACTION.TYPE_SEARCH,
      value: event.target.value,
    });
  }

  useEffect(() => {
    if (state.typedInMovieTitle) {
      const fetchData = async () => {
        dispatch({ type: "FETCH_DATA" });
        try {
          const result = await axios(
            `https://api.tvmaze.com/search/shows?q=${state.typedInMovieTitle}`
          );
          dispatch({
            type: ACTION.FETCH_DATA_SUCCESS,
            value: result.data,
          });
        } catch (error) {
          dispatch({ type: "FETCH_DATA_FAIL" });
        }
      };
      fetchData();
    }
  }, [state.typedInMovieTitle]);

  useEffect(() => {
    setMoviesOfAppComponent(state.movies);
  }, [state.movies, setMoviesOfAppComponent]);

  return (
    <div className={style.searchContainer}>
      <AppBar position="static">
        <ToolBar>
          <Typography variant="h3">Movies and Series</Typography>
          <section className={classes.rightToolbar}>
            <TextField
              label="Search"
              variant="outlined"
              onChange={onChange}
              size="small"
            />
          </section>
          <ThemeProvider theme={theme}>
            <CssBaseline />
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
