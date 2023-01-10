import React from "react";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Avatar } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    transform: "translateY(100%)",
    left: "0",
    width: "100%",
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
        {users?.map((user) => (
          <ListItem key={user._id}>
            <Avatar
              src={"http://localhost:3001/assets/" + user.picturePath}
              sx={{ marginRight: "1rem" }}
            />
            <ListItemText primary={`${user.firstName} ${user.lastName}`} />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default SearchResults;
