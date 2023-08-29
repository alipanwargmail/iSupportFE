import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Image from './red_background.png';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    //backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

async function loginUser(credentials) {

  console.log(credentials)
  /*
  axios.post("https://dainty-blini-408c4c.netlify.app/.netlify/functions/login", { credentials }, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  }).then(response => response.json())*/  
  
  //return fetch('http://localhost:3001/login', {    
  return fetch('https://dainty-blini-408c4c.netlify.app/.netlify/functions/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())

}

export default function Signin() {
  // const navigate = useNavigate();
  const classes = useStyles();
  const [user_id, setUser_id] = useState();
  const [username, setUserName] = useState();
  const [role_user, setRole_user] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [retval, setRetval] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password
    });
    console.log(response)
    setRetval(retval)
    //if ('token' in response) {
    if (response.hasOwnProperty("token")) {
      swal({
        title: "Success!",
        text: "OK",//response.message,
        icon: "success",
        button: "OK!",
      })
        .then((value) => {
          console.log(response['role_user'])

          setUser_id(response['user_id']);
          setUserName(response['username'])
          setRole_user(response['role_user'])
          setEmail(response['email'])
          localStorage.setItem('user_id', JSON.stringify(response['user_id']));
          localStorage.setItem('username', JSON.stringify(response['username']));
          localStorage.setItem('role_user', JSON.stringify(response['role_user']));
          localStorage.setItem('email', JSON.stringify(response['email']));
          localStorage.setItem('phone_no', JSON.stringify(response['phone_no']));
          localStorage.setItem('token', response['token']);
          console.log(role_user)

          if (response['role_user'] === 'USER') {
            window.location.href = "/listticketuser";
          }
          else if (response['role_user'] === 'AGENT') {
            window.location.href = "/listticketagent";
          }
          else {
            window.location.href = "/dashboard";
          }
        });
    }
    else {
      swal("Failed", response.message, "error");
    }
  }

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              onChange={e => setUserName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Password" s
              label='Password'
              type={showPassword ? "text" : "password"} // <-- This is where the magic happens
              onChange={e => setPassword(e.target.value)}
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
