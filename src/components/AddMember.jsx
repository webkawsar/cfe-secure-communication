import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField
} from "@mui/material";
import React from "react";

const AddMember = () => {
  return (
    <Box>
      <Paper sx={{ padding: "20px" }}>
        <Box component="form">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="firstName"
                label="First name"
                variant="outlined"
                helperText="Some important first name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last name"
                variant="outlined"
                helperText="Some important last name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                helperText="Some important email"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="token"
                label="Token"
                variant="outlined"
                helperText="Some important token"
              />
            </Grid>

            <Grid item container xs={12} justifyContent="space-between">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Send Activation Email"
              />
              <Button variant="outlined">Save</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddMember;
