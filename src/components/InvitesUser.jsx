import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getInvitesUser } from "../store/data/inviteUserSlice";
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
const InvitesUser = () => {
  const { isError, isSuccess, isLoading, message, users } = useSelector(
    (state) => state.invitesUser
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError]);

  useEffect(() => {
    dispatch(getInvitesUser());
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      {isSuccess && <UserTable headCells={headCells} users={users} />}
    </>
  );
};

export default InvitesUser;
