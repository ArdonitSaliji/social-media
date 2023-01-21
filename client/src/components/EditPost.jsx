import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  DialogActions,
} from "@mui/material";

import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PostTable from "./PostTable";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function EditPost(props) {
  const {
    popup: { post, open },
    setPopup,
  } = props;

  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(true);
  const [postDesc, setPostDesc] = useState(post.description);

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("postId", post._id);
    formData.append("description", postDesc || post.description);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    } else if (!image && !!showImage) {
      formData.append("picture", null);
      formData.append("picturePath", null);
    }

    const response = await fetch(`http://localhost:3001/posts/update`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    console.log(response);
    const data = await response.json();
    setPopup((prev) => ({ ...prev, post: { picturePath: data.picturePath } }));
    setImage(null);

    window.location.reload();
  };

  return (
    <Dialog sx={{ mb: "3rem" }} open={open}>
      <DialogTitle>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6" component="div">
            Edit Post
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent
        sx={{
          minWidth: "400px",
          minHeight: "350px",
          pb: 0,
          paddingBottom: "6rem",
        }}
        dividers
      >
        <TextField
          variant="standard"
          fullWidth
          multiline
          sx={{ border: "none", outline: "none" }}
          defaultValue={post.description}
          placeholder="What's on your mind?"
          InputProps={{
            disableUnderline: true,
          }}
          onChange={(e) => setPostDesc(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          {showImage && post.picturePath && (
            <>
              <img
                src={`http://localhost:3001/assets/${post.picturePath}`}
                style={{ width: "18rem", height: "18rem" }}
                alt=""
              />
              <CloseIcon
                onClick={() => setShowImage(false)}
                sx={{
                  position: "absolute",
                  transform: "translateY(-0.7rem)",
                  right: "2.5rem",
                  bgcolor: "#3e4042",
                  borderRadius: "50%",
                  width: "2rem",
                  height: "2rem",
                  cursor: "pointer",
                }}
              />
            </>
          )}
          <PostTable image={image} setImage={setImage} imageShown={showImage} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ width: "50%" }}
          onClick={() => {
            setTimeout(() => {
              setShowImage(true);
            }, 300);
            setPopup((prev) => ({ ...prev, open: false }));
          }}
        >
          Cancel
        </Button>
        {postDesc === post.description && showImage ? (
          <Button disabled={true} sx={{ width: "50%" }}>
            Done
          </Button>
        ) : (
          <Button
            sx={{ width: "50%" }}
            onClick={() => {
              handlePost();
              // setPopup((prev) => ({ ...prev, open: false }));
            }}
          >
            Done
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

//
