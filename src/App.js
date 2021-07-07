import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HomePage } from "./HomePage";
import { BookPage } from "./BookPage";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import TBRPage from "./TBRPage";

export function App() {
  return (
    <Router>
      <Box>
        <AppBar position="static">
          <Toolbar>
          <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography
                variant="h5"
                color="inherit"
                style={{ paddingRight: 12 }}
              >
                Brendan's Book Tracker
              </Typography>
            </Link>

            <Link
              to="/"
              style={{ textDecoration: "none", color: "white", padding: 12 }}
            >
              <Typography variant="h5" color="inherit">
                Home
              </Typography>
            </Link>

            <Link
              to="/book"
              style={{ textDecoration: "none", color: "white", padding: 12 }}
            >
              <Typography variant="h5" color="inherit">
                Books
              </Typography>
            </Link>

            <Link
              to="/tbr"
              style={{ textDecoration: "none", color: "white", padding: 12 }}
            >
              <Typography variant="h5" color="inherit">
                TBR
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <Switch>
        <Route path="/book">
          <BookPage />
        </Route>
        <Route path="/tbr">
          <TBRPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}
