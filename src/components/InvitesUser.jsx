import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getInvitesUser } from "../store/invites/inviteUserSlice";
import Loader from "./Loader";
import UserTable from "./UserTable";

const headCells = [
    {
      id: 1,
      numeric: false,
      disablePadding: false,
      label: "First name",
    },
    {
      id: 2,
      numeric: false,
      disablePadding: false,
      label: "Last name",
    },
    {
      id: 3,
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    {
      id: 4,
      numeric: false,
      disablePadding: false,
      label: "Token",
    },
    {
      id: 5,
      numeric: false,
      disablePadding: false,
      label: "isActivate",
    },
  ];

// const loader = () => {
  
// }


const InvitesUser = () => {
  const { getIsError, getIsSuccess, getIsLoading, getMessage, users } = useSelector(
    (state) => state.invitesUser
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (getIsError) {
      toast.error(getMessage);
    }
  }, [getIsError]);

  useEffect(() => {
    dispatch(getInvitesUser());
  }, []);

  return (
    <>
      {getIsLoading && <Loader />}

      {getIsSuccess && <UserTable headCells={headCells} users={users} />}
    </>
  );
};

export default InvitesUser;
