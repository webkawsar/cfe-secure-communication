import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { authRegister } from "../store/auth/authSlice";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Developed by "}
      <RouterLink color="inherit" href="https://facebook.com/webkawsar">
        Kawsar Ahmed
      </RouterLink>{" "}
      @ {new Date().getFullYear()}
    </Typography>
  );
};
const theme = createTheme();

const Register = () => {
  const { isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const inputData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      token: data.get("token"),
    };

    dispatch(authRegister(inputData));
  };

  // useEffect(() => {
    
  //   if (isSuccess && user?.confirmed) {
      
  //     // set user to local storage
  //     localStorage.setItem("user", JSON.stringify(user));
  //     localStorage.setItem("token", token);

  //     toast.success(message);
  //     navigate("/dashboard");
      
  //   } else if(isSuccess && !user?.confirmed) {

  //     toast.error('Your account is not confirmed by email');
  //   }

  //   if (isError) {

  //     toast.error(message);
  //   }

  // }, [isSuccess, isError]);


  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" disabled={isLoading}>
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last name"
              name="lastName"
              autoComplete="lastName"
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm password"
              type="password"
              id="confirmPassword"
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="token"
              label="Token"
              name="token"
              type='number'
              autoComplete="token"
              
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <RouterLink to="/forget-password" variant="body2">
                  Forgot password?
                </RouterLink>
              </Grid>
              <Grid item>
                <RouterLink to="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Register;
