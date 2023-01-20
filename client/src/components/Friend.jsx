import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  MoreHoriz,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  List,
  ListItemButton,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setPosts } from "state";
import EditPost from "./EditPost";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({
  postId,
  friendId,
  picturePath,
  description,
  name,
  subtitle,
  userPicturePath,
  profile,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const posts = useSelector((state) => state.posts);

  const [edit, setEdit] = useState(false);
  const [popup, setPopup] = useState({
    open: false,
    post: "",
    picture: "",
  });
  const [openDelete, setOpenDelete] = useState(false);
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

  const deletePost = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/delete/post`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: _id,
        }),
      }
    );
    const { allPosts, userPosts } = await response.json();

    if (window.location.pathname === "/home") {
      dispatch(setPosts({ posts: allPosts }));
    } else {
      dispatch(setPosts({ posts: userPosts }));
    }
  };

  function SearchResults() {
    const classes = useStyles();
    return (
      <List sx={{ position: "absolute" }} className={classes.root}>
        <ListItemButton
          sx={{ height: "2rem" }}
          id={postId}
          onClick={(e) => {
            const findPost = posts.find(
              (post) => post._id === e.target.id && post
            );
            setPopup({
              ...popup,
              post: findPost,
              open: true,
            });
          }}
        >
          Edit
        </ListItemButton>
        <ListItemButton sx={{ height: "2rem" }}>Archive</ListItemButton>
        <ListItemButton sx={{ height: "2rem" }}>Share</ListItemButton>
        <ListItemButton
          sx={{ height: "2rem" }}
          onClick={() => {
            setOpenDelete(true);
          }}
        >
          Delete
        </ListItemButton>
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
      <Dialog
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete this post?"}
        </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenDelete(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              deletePost();
              setOpenDelete(false);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <EditPost
        title="Employee Form"
        popup={popup}
        setPopup={setPopup}
        postId={postId}
        description={description}
      ></EditPost>
    </FlexBetween>
  );
};

export default Friend;
