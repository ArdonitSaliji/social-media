import { AccountCircle, Image } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  DialogActions,
} from "@mui/material";

import { Button } from "@mui/material";

export default function Popup(props) {
  const { popup, setPopup } = props;
  return (
    <Dialog sx={{ mb: "3rem" }} open={popup.open}>
      <DialogTitle>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6" component="div">
            Edit Post
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent sx={{ minWidth: "350px", minHeight: "300px" }} dividers>
        <TextField
          variant="standard"
          fullWidth
          multiline
          sx={{ border: "none", outline: "none" }}
          defaultValue={popup.post.description}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <img
          src={`http://localhost:3001/assets/${popup.post.picturePath}`}
          alt=""
        />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ width: "50%" }}
          onClick={() => setPopup({ ...popup, open: false })}
        >
          Cancel
        </Button>
        <Button
          sx={{ width: "50%" }}
          onClick={() => setPopup({ ...popup, open: false })}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

//
