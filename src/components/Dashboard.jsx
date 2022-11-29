import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registeredUser } from "../store/user/userSlice";
import Loader from "./Loader";

const headCells = [
  {
    id: 1,
    numeric: false,
    disablePadding: false,
    label: "First name",
  },
  {
    id: 6,
    numeric: false,
    disablePadding: false,
    label: "Last name",
  },
  {
    id: 2,
    numeric: false,
    disablePadding: false,
    label: "Username",
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
    label: "isAdmin",
  },
  {
    id: 5,
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

const createData = (name, calories, fat, carbs, protein) => {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
};

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
];

const Dashboard = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { isError, isSuccess, isLoading, message, users } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError]);

  useEffect(() => {
    dispatch(registeredUser());
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? "right" : "left"}
                      padding={headCell.disablePadding ? "none" : "normal"}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => {
                  const {username, email, isAdmin} = user;

                  return (
                    <TableRow hover key={user.id}>
                      <TableCell>{'firstName'}</TableCell>
                      <TableCell>{'lastName'}</TableCell>
                      <TableCell>{username}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{isAdmin? 'true' : 'false'}</TableCell>
                      <TableCell>{'actions'}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default Dashboard;
