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
  const handleSubmit = (event) => {

    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const inputData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      token: data.get("token"),
    };
    console.log(inputData, 'inputData')
    
  }
  return (
    <Box>
      <Paper sx={{ padding: "20px" }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="firstName"
                label="First name"
                variant="outlined"
                helperText="Some important first name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="lastName"
                label="Last name"
                variant="outlined"
                helperText="Some important last name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                helperText="Some important email"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="token"
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
              
              <Button type="submit" variant="outlined">Save</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddMember;
