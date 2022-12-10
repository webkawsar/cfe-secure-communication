import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Box, Paper,
  TextField,
  Typography
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { styled } from "@mui/material/styles";
import { format } from "date-fns";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import axiosPrivateInstance from "../../axios";
import socket from '../../config/web-sockets';
import { sendMessage } from '../../store/messenger/messengerSlice';

export const loader = async ({ params }) => {
  const { data } = await axiosPrivateInstance().get(`/users/${params.userId}`);
  const { data: messages } = await axiosPrivateInstance().get(
    `/messages/${data?.username}`
  );
  return { data, messages };
};

// MuiInputBase-root MuiFilledInput-root MuiFilledInput-underline MuiInputBase-colorPrimary MuiInputBase-formControl MuiInputBase-multiline css-1gzyby-MuiInputBase-root-MuiFilledInput-root

const CustomizedTextField = styled(TextField)`
  width: 40%;
  :hover {
    color: #2e8b57;
  }
  & .MuiInputBase-root {
    border-radius: 30px;
  }
  & .css-1gzyby-MuiInputBase-root-MuiFilledInput-root:before {
    border: none;
  }
  &
    .css-1gzyby-MuiInputBase-root-MuiFilledInput-root:hover:not(
      .Mui-disabled
    ):before {
    border: none;
  }
  & .css-1gzyby-MuiInputBase-root-MuiFilledInput-root:after {
    border: none;
  }
`;

const MessengerUser = () => {
  const { data, messages } = useLoaderData();
  const loggedInUser = useSelector((state) => state?.auth?.user);
  const messenger = useSelector(state => state.messenger);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputData = new FormData(event.currentTarget);
    const message = {
      text: inputData.get("message"),
      receiver: data.id,
    };

    // validation
    if(!message.text || message.text === ' ') return false;

    // socket.io event
    socket.emit('send-message', message);

    dispatch(sendMessage(message));

    socket.on('get-message', data => {
      console.log(data, 'get message data')
    })

    // reset input field
    document.getElementById('message').value = '';
  };

  // console.log(messenger, 'messenger');

  return (
    <Box sx={{ maxHeight: "100vh"}}>
      <Box sx={{ overflow: "hidden" }}>
        {messages.length ? (
          messages.map((message, index, array) => {
            const sender = message?.sender?.username === loggedInUser?.username;
            const nextMsg = array[index + 1];
            const hasReceiverNextMsg =
              nextMsg?.receiver?.username === loggedInUser?.username;
            const hasSenderNextMsg =
              nextMsg?.sender?.username === loggedInUser?.username;

            const prevMsg = array[index - 1];
            const hasSenderPrevMsg =
              prevMsg?.sender?.username === loggedInUser?.username;
            const hasReceiverPrevMsg =
              prevMsg?.receiver?.username === loggedInUser?.username;

            return (
              <Box key={message.id}>
                {sender ? (
                  <Box sx={{ overflow: "hidden" }}>
                    <Box
                      sx={{
                        textAlign: "right",
                        float: "right",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          marginLeft: "5px",
                          display:
                            (!hasSenderPrevMsg && hasSenderNextMsg) ||
                            (!hasSenderPrevMsg && !hasSenderNextMsg)
                              ? "block"
                              : "none",
                        }}
                      >
                        {format(new Date(message?.createdAt), "h:m a")}
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
                        visibility:
                          (!hasReceiverPrevMsg && hasReceiverNextMsg) ||
                          (!hasReceiverPrevMsg && !hasReceiverNextMsg)
                            ? "visible"
                            : "hidden",
                      }}
                    >
                      {message?.sender?.firstName?.slice(0, 1)}
                    </Avatar>
                    <Box sx={{ marginLeft: "10px" }}>
                      <Typography
                        variant="caption"
                        sx={{
                          display:
                            (!hasReceiverPrevMsg && hasReceiverNextMsg) ||
                            (!hasReceiverPrevMsg && !hasReceiverNextMsg)
                              ? "flex"
                              : "none",
                        }}
                      >
                        {message.sender.firstName},{" "}
                        <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                          {format(new Date(message?.createdAt), "h:m a")}
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

      <Box
        sx={{
          position: "sticky",
          left: 0,
          bottom: 0,
          backgroundColor: "white",
          width: "100%",
          zIndex: "99999",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomizedTextField
            margin="normal"
            required
            id="message"
            name="message"
            variant="filled"
            label="Type a message"
            multiline
            maxRows={9}
          />

          <IconButton type='submit' color="primary">
            <SendIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MessengerUser;
