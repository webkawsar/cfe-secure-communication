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
          messages.map(message => {
            console.log(message, 'message');
            return (
              <Box key={message.id}>
                {
                  message.receiver.username === data.username &&
                  <Box sx={{display: 'flex'}}>
                    <Avatar sx={{marginRight: '10px'}} />
                    <Box>
                      <Typography variant="caption" sx={{display: 'flex'}}>
                        {message.receiver.firstName},
                        <Typography variant="body2" sx={{marginLeft: '5px'}}>7:38 PM</Typography>
                      </Typography>
                      <Paper square elevation={0} sx={{padding: '10px', backgroundColor: '#F6F6F9', borderRadius: '0 10px 10px 10px'}}>
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
        } 

        
    </Box>
  )
}

export default MessengerUser