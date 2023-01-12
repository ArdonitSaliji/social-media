import { MoreHoriz } from "@mui/icons-material";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import { setIsProfile } from "state";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.isProfile);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const loggedInUser = useSelector((state) => state.user);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (data._id === loggedInUser._id) {
      dispatch(setIsProfile(true));
    }
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box
          position="relative"
          flexBasis={isNonMobileScreens ? "26%" : undefined}
        >
          <UserWidget
            values={{ marginTop: "5rem", width: "27.5rem" }}
            userId={userId}
            picturePath={user.picturePath}
          />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget profile={profile} userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
