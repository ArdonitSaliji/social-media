import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  MoreHoriz,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath, profile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [edit, setEdit] = useState(false);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend =
    friends.length > 0 && friends?.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      zIndex: "2",
      borderRadius: "10px",
      button: true,
      transform: "translateY(100%)",
      right: "0",
      width: "8rem",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      bottom: "0",
    },
  }));

  function SearchResults() {
    const classes = useStyles();
    return (
      <List sx={{ position: "absolute" }} className={classes.root}>
        <ListItem sx={{ height: "4rem" }}>Hellooo</ListItem>
      </List>
    );
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {profile ? (
        <IconButton
          onClick={() => setEdit((prev) => !prev)}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          <MoreHoriz sx={{ color: primaryDark }} />
          {edit && <SearchResults />}
        </IconButton>
      ) : isFriend ? (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          <PersonAddOutlined sx={{ color: primaryDark }} />
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
