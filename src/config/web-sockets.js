import { io } from "socket.io-client";


  const isProduction = import.meta.env.PROD;
  const STRAPI_ENDPOINT = isProduction
    ? import.meta.env.VITE_PRODUCTION_URL
    : import.meta.env.VITE_DEVELOPMENT_URL;

  const socket = io("http://localhost:1337", {
    path: "/api/socket/v1",
    auth: {
      token: "",
    },
  });

  socket.on("connect", (data) => {
    console.log('Client side socket is connected');
  });

  export default socket;
