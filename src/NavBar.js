import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

function NavBar(props) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              props.toggleDrawer(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="inherit">
            Brendan's Book Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavBar;
