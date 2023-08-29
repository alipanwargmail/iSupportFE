import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button, FormControl, Select, InputLabel, Grid, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '40ch',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    minWidth: '40ch',
  }
}));

export default function CreateUser() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone_no, setPhoneNo] = React.useState('');
  const [role_user, setRole_user] = React.useState('');
  //const [response, setResponse] = React.useState('');
  const open = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem('username'));
  const token = localStorage.getItem('token');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDashboard = () => {
    window.location.href = "/";
  };
  const handleListUser = () => {
    window.location.href = "/listuser";
  };
  const handleCreateUser = () => {
    window.location.href = "/createuser";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleChangeRoleUser = (event) => {
    console.log(event.target.value)
    setRole_user(event.target.value)
  };
  const handleAddUser = () => {
    console.log(username)
    console.log(email)
    console.log(password)
    console.log(phone_no)
    console.log(role_user)
    //axios.post("http://localhost:3001/users", {username, email, password, phone_no, role_user}, {
      axios.post("https://dainty-blini-408c4c.netlify.app/.netlify/functions/users-create", {username, email, password, phone_no, role_user}, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    }).then(response => {

      const { data } = response
      console.log(data)
      //setResponse(data)
      
      swal("Success", "User created", "success", {
        buttons: false,
        timer: 2000,
      })
      window.location.href = "/listuser";
  
    })      
    
};

return (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Create User
        </Typography>
        <div>
          <IconButton onClick={handleMenu} color="inherit">
            <Avatar src={user.avatar} />
          </IconButton>
          <Menu id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
            <MenuItem onClick={handleListUser}>List User</MenuItem>
            <MenuItem onClick={handleCreateUser}>Create User</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
    <Grid container justify="center">
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="filled-username"
            label="Username"
            value={username}
            onChange={(newValue) => setUsername(newValue.target.value)}
            variant="filled"
          />
        </div>
        <div>
          <TextField
            id="filled-email"
            label="Email"
            value={email}
            onChange={(newValue) => setEmail(newValue.target.value)}
            variant="filled"
          />
        </div>
        <div>
          <TextField
            id="filled-password"
            label="Password"
            value={password}
            type="password"
            onChange={(newValue) => setPassword(newValue.target.value)}
            variant="filled"
          />
        </div>
        <div>
          <TextField
            id="filled-phone_no"
            label="Phone No"
            value={phone_no}
            onChange={(newValue) => setPhoneNo(newValue.target.value)}
            variant="filled"
          />
        </div>
        <div>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Role User</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={role_user}
              onChange={handleChangeRoleUser}
            >
              <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
              <MenuItem value={'AGENT'}>AGENT</MenuItem>
              <MenuItem value={'USER'}>USER</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Grid container justify='center'>
        <div>
          <Button className={classes.button} variant="contained" color="primary" onClick={() => handleAddUser()}>
            Create User
          </Button>
        </div>
        </Grid>
      </form>
    </Grid>
  </div >
);
}