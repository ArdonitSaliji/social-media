import React, { useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useTheme } from "@emotion/react";
import FlexBetween from "components/FlexBetween";

import Dropzone from "react-dropzone";
import { Box, IconButton, Typography } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
// import { useDispatch } from "react-redux";

export default function PostTable(props) {
  //
  const { image, setImage, imageShown } = props;
  const { palette } = useTheme();
  const primaryDark = palette.primary.dark;

  const primaryLight = palette.primary.light;
  const [isImage, setIsImage] = useState(false);

  //   const dispatch = useDispatch();
  const baseStyle = {
    margin: "20px",
  };

  const style = useMemo(() => ({
    ...baseStyle,
  }));

  return (
    <TableContainer
      component={Paper}
      sx={{
        m: "1rem 0",
        position: "absolute",
        bottom: "10%",
        right: "50%",
        transform: "translateX(50%)",
        minWidth: "90%",
        maxWidth: "95%",
      }}
    >
      {isImage && !imageShown && (
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <FlexBetween>
              <Box
                {...getRootProps({ style })}
                border={`2px dashed ${palette.primary.main}`}
                p="1rem"
                width="100%"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <input {...getInputProps()} />
                {!image ? (
                  <p>Add Image Here</p>
                ) : (
                  <FlexBetween>
                    <Typography>{image.name}</Typography>
                    <EditOutlined />
                  </FlexBetween>
                )}
              </Box>
              {image && !imageShown && (
                <IconButton
                  onClick={() => setImage(null)}
                  sx={{ width: "15%" }}
                >
                  <DeleteOutlined />
                </IconButton>
              )}
            </FlexBetween>
          )}
        </Dropzone>
      )}

      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Add to your post</TableCell>
            <TableCell
              sx={{
                padding: "0",
                textAlign: "center",
              }}
            >
              <ImageSearchIcon
                onClick={() => setIsImage(!isImage)}
                sx={{
                  cursor: "pointer",
                  fontSize: "2rem",
                  color: primaryDark,
                  "&:hover": {
                    transform: "scale(1.1)",
                    color: primaryLight,
                  },
                }}
              />
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
