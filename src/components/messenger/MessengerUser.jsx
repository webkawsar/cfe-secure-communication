import { Avatar, Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import axiosPrivateInstance from '../../axios';


export const loader = async ({params}) => {

  const {data} = await axiosPrivateInstance().get(`/users/${params.userId}`);
  const {data: messages} = await axiosPrivateInstance().get(`/messages/${data?.username}`);
  return {data, messages};
}

const MessengerUser = () => {

  const {data, messages} = useLoaderData();
  // console.log(data, 'data');
  // console.log(messages, 'messages');

  return (
    <Box>

        {/* <Box>

          <Box sx={{display: 'flex'}}>
            <Avatar sx={{marginRight: '10px'}} />
            <Box>
              <Typography variant="caption" sx={{display: 'flex'}}>
                Username,
                <Typography variant="body2" sx={{marginLeft: '5px'}}>7:38 PM</Typography>
              </Typography>
              <Paper square elevation={0} sx={{padding: '10px', backgroundColor: '#F6F6F9', borderRadius: '0 10px 10px 10px'}}>
                <Typography variant="body2" component="p">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam asperiores repellat eos minima saepe nisi sapiente alias?.</Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={{display: 'flex'}}>
            <Avatar sx={{marginRight: '10px'}} />
            <Box>
              <Typography variant="caption" sx={{display: 'flex'}}>
                Username,
                <Typography variant="body2" sx={{marginLeft: '5px'}}>7:38 PM</Typography>
              </Typography>
              <Paper square elevation={0} sx={{padding: '10px', backgroundColor: '#F6F6F9', borderRadius: '0 10px 10px 10px'}}>
                <Typography variant="body2" component="p">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam asperiores repellat eos minima saepe nisi sapiente alias?.</Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={{textAlign: 'right', display: 'inline-block', float: 'right'}}>
            <Typography variant="body2" sx={{marginLeft: '5px'}}>7:38 PM</Typography>
            <Paper square elevation={0} sx={{padding: '10px', backgroundColor: '#dff9fb', borderRadius: '10px 10px 0 10px'}}>
              <Typography variant="body2" component="p">Ok Boss! You are right</Typography>
            </Paper>
          </Box>
          
        </Box> */}




        {
          messages.length ?
          messages.map((message, index, array) => {
            // console.log(message, 'message');
            // console.log(index, 'index');
            // console.log(array, 'array');
            const nextMsg = array[index+1];
            const hasReceiverNextMsg = nextMsg?.receiver?.username === data?.username;
            const isShowReceiverInfo = message.receiver.username === data.username;
            const showReceiverInfoNextTime = message?.receiver?.username === data?.username ? hasReceiverNextMsg : false;
            return (
              <Box key={message.id}>
                {
                  isShowReceiverInfo &&
                  <Box sx={{display: 'flex'}}>
                    {
                      <Avatar sx={{visibility: showReceiverInfoNextTime ? 'visible' : 'hidden'}} />
                    }
                    <Box sx={{marginLeft: '10px'}}>
                      <Typography variant="caption" sx={{display: showReceiverInfoNextTime ? 'flex' : 'none'}}>
                          {message.receiver.firstName}, <Typography variant="body2" sx={{marginLeft: '5px'}}>7:38 PM</Typography>
                      </Typography>
                      <Paper square elevation={0} sx={{padding: '10px', backgroundColor: '#F6F6F9', borderRadius: '0 10px 10px 10px', marginTop: '2px'}}>
                        <Typography variant="body2" component="p">{message.text}</Typography>
                      </Paper>
                    </Box>
                  </Box>
                }

                {
                  message.sender.username === data.username &&
                  <Box sx={{textAlign: 'right', display: 'inline-block', float: 'right'}}>
                    <Typography variant="body2" sx={{marginLeft: '5px'}}>7:38 PM</Typography>
                    <Paper square elevation={0} sx={{padding: '10px', backgroundColor: '#dff9fb', borderRadius: '10px 10px 0 10px'}}>
                      <Typography variant="body2" component="p">{message.text}</Typography>
                    </Paper>
                  </Box>
                }
              </Box>
            )
          })
          :
          <Typography variant="body1" component="p">You haven't chat yet</Typography>
        } 

        
    </Box>
  )
}

export default MessengerUser