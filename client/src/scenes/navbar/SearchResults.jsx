import React from "react";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, ListItemButton } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    button: true,
    transform: "translateY(100%)",
    left: "0",
    width: "100%",
    transform: "translateY(100%)",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    bottom: "0",
  },
}));

function SearchResults(props) {
  const classes = useStyles();
  const { users } = props;
  if (users) {
    return (
      <List sx={{ position: "absolute" }} className={classes.root}>
        {users.length > 0 &&
          users?.map((user) => (
            <ListItemButton
              href={"/profile/" + user._id}
              sx={{ height: "4rem" }}
              key={user._id}
            >
              <Avatar
                src={"http://localhost:3001/assets/" + user.picturePath}
                sx={{ marginRight: "1rem" }}
              />
              <ListItemText primary={`${user.firstName} ${user.lastName}`} />
            </ListItemButton>
          ))}
      </List>
    );
  }
}

export default SearchResults;
