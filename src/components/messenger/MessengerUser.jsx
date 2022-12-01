import React from 'react';
import { useLoaderData } from 'react-router-dom';
import axiosPrivateInstance from '../../axios';


export const loader = async ({params}) => {

  const {data} = await axiosPrivateInstance().get(`/users/${params.userId}`);
  const {data: messages} = await axiosPrivateInstance().get(`/messages/${data?.username}`);
  return {data, messages};
}

const MessengerUser = () => {

  const data = useLoaderData();
  console.log(data, 'data');

  return (
    <>
      {/* <p>Username: {user.username}</p>
      <p>Email: {user.email}</p> */}
    </>
  )
}

export default MessengerUser