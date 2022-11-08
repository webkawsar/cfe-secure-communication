import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow
} from "@mui/material";
import React, { useState } from "react";


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

const headCells = [
  {
    id: 1,
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: 2,
    numeric: true,
    disablePadding: false,
    label: "Username",
  },
  {
    id: 3,
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: 4,
    numeric: true,
    disablePadding: false,
    label: "Activated",
  },
  {
    id: 5,
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

const UserTable = () => {
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

  return (
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
              <TableRow hover>
                <TableCell component="th" scope="row" padding="normal">
                  Kawsar
                </TableCell>
                <TableCell align="right">web.kawsarahmed@gmail.com</TableCell>
                <TableCell align="right">abc</TableCell>
                <TableCell align="right">01715103606</TableCell>
                <TableCell align="right">MoulviBazar</TableCell>
              </TableRow>
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
  );
};

export default UserTable;
