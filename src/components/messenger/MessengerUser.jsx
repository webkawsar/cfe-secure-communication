import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import axiosPrivateInstance from "../../axios";
import { sendMessage } from "../../store/messenger/messengerSlice";

export const loader = async ({ params }) => {
  const { data } = await axiosPrivateInstance().get(`/users/${params.userId}`);
  const { data: messages } = await axiosPrivateInstance().get(
    `/messages/${data?.username}`
  );
  return { data, messages };
};

const MessengerUser = () => {
  const { data, messages } = useLoaderData();
  const loggedInUser = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputData = new FormData(event.currentTarget);
    const message = {
      text: inputData.get("message"),
      receiver: data.id,
    };

    dispatch(sendMessage(message));
  };

  // console.log(loggedInUser, 'loggedInUser');

  return (
    <Box sx={{ maxHeight: "100vh" }}>
      <Box sx={{ overflow: "hidden" }}>
        {messages.length ? (
          messages.map((message, index, array) => {

            const sender = message?.sender?.username === loggedInUser?.username;
            const nextMsg = array[index + 1];
            const hasReceiverNextMsg = nextMsg?.receiver?.username === loggedInUser?.username;
            const hasSenderNextMsg = nextMsg?.sender?.username === loggedInUser?.username;
    
            const prevMsg = array[index - 1];
            const hasSenderPrevMsg = prevMsg?.sender?.username === loggedInUser?.username;
            const hasReceiverPrevMsg = prevMsg?.receiver?.username === loggedInUser?.username;
            
            return (
              <Box key={message.id}>
                {sender ? (
                  <Box sx={{overflow: 'hidden'}}>
                    <Box
                      sx={{
                        textAlign: "right",
                        float: 'right'
                      }}
                    >
                      <Typography variant="body2" sx={{ marginLeft: "5px", display: (!hasSenderPrevMsg && hasSenderNextMsg ) ? 'block' : 'none' }} >
                        7:38 PM
                      </Typography>
                      <Paper
                        square
                        elevation={0}
                        sx={{
                          padding: "10px",
                          backgroundColor: "#dff9fb",
                          borderRadius: "10px 10px 0 10px",
                          marginTop: "2px",
                        }}
                      >
                        <Typography variant="body2" component="p">
                          {message.text}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                  
                ) : (
                  <Box sx={{ display: "flex" }}>
                    <Avatar
                      sx={{
                        visibility: (!hasReceiverPrevMsg && hasReceiverNextMsg)
                          ? "visible"
                          : "hidden",
                      }}
                    />
                    <Box sx={{ marginLeft: "10px" }}>
                      <Typography
                        variant="caption"
                        sx={{
                          display: (!hasReceiverPrevMsg && hasReceiverNextMsg) ? "flex" : "none",
                        }}
                      >
                        {message.sender.firstName},{" "}
                        <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                          7:38 PM
                        </Typography>
                      </Typography>
                      <Paper
                        square
                        elevation={0}
                        sx={{
                          padding: "10px",
                          backgroundColor: "#F6F6F9",
                          borderRadius: "0 10px 10px 10px",
                          marginTop: "2px",
                        }}
                      >
                        <Typography variant="body2" component="p">
                          {message.text}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })
        ) : (
          <Typography variant="h5" component="h5" sx={{ textAlign: "center" }}>
            You haven't had any chat with {`${data.firstName} ${data.lastName}`}{" "}
            yet
          </Typography>
        )}
      </Box>

      <Box sx={{ position: "fixed", bottom: 0 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            margin="normal"
            required
            id="message"
            name="message"
            variant="filled"
            label="Type a message"
            sx={{ borderRadius: "50px 50px 50px 50px" }}
            multiline
            maxRows={9}
            fullWidth
          />

          <Button type="submit" variant="contained" sx={{ ml: 2 }}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MessengerUser;
