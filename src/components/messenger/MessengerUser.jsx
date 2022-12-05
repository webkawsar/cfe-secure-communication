import { Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";
import axiosPrivateInstance from "../../axios";

export const loader = async ({ params }) => {
  const { data } = await axiosPrivateInstance().get(`/users/${params.userId}`);
  const { data: messages } = await axiosPrivateInstance().get(
    `/messages/${data?.username}`
  );
  return { data, messages };
};

const MessengerUser = () => {
  const { data, messages } = useLoaderData();


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const message = data.get("message")

    console.log(message, 'message')
  };


  return (
    <Box>
      <Box>
        {messages.length ? (
          messages.map((message, index, array) => {
            const nextMsg = array[index + 1];
            const hasReceiverNextMsg =
              nextMsg?.receiver?.username === data?.username;
            const isShowReceiverInfo =
              message.receiver.username === data.username;
            const showReceiverInfoNextTime =
              message?.receiver?.username === data?.username
                ? hasReceiverNextMsg
                : false;
            return (
              <Box key={message.id}>
                {isShowReceiverInfo && (
                  <Box sx={{ display: "flex" }}>
                    {
                      <Avatar
                        sx={{
                          visibility: showReceiverInfoNextTime
                            ? "visible"
                            : "hidden",
                        }}
                      />
                    }
                    <Box sx={{ marginLeft: "10px" }}>
                      <Typography
                        variant="caption"
                        sx={{
                          display: showReceiverInfoNextTime ? "flex" : "none",
                        }}
                      >
                        {message.receiver.firstName},{" "}
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

                {message.sender.username === data.username && (
                  <Box
                    sx={{
                      textAlign: "right",
                      display: "inline-block",
                      float: "right",
                    }}
                  >
                    <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                      7:38 PM
                    </Typography>
                    <Paper
                      square
                      elevation={0}
                      sx={{
                        padding: "10px",
                        backgroundColor: "#dff9fb",
                        borderRadius: "10px 10px 0 10px",
                      }}
                    >
                      <Typography variant="body2" component="p">
                        {message.text}
                      </Typography>
                    </Paper>
                  </Box>
                )}
              </Box>
            );
          })
        ) : (
          <Typography variant="body1" component="p">
            You haven't chat yet
          </Typography>
        )}
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          margin="normal"
          required
          id="message"
          name="message"
          variant="filled"
          sx={{width: '100%', borderRadius: '70%'}}
          multiline
          maxRows={9}
        />

        <Button>Send</Button>
      </Box>
    </Box>
  );
};

export default MessengerUser;
