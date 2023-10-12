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

export default function CreateTicket() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [deskripsi, setDeskripsi] = React.useState('');
  const [priority, setPriority] = React.useState('');
  //const [response, setResponse] = React.useState('');
  const open = Boolean(anchorEl);
  const username = JSON.parse(localStorage.getItem('username'));
console.log(localStorage.getItem('user_id'))
  const user_id = JSON.parse(localStorage.getItem('user_id'));
  const email = JSON.parse(localStorage.getItem('email'));
  const phone_no = JSON.parse(localStorage.getItem('phone_no'));
  const token = localStorage.getItem('token');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleListTicket = () => {
    window.location.href = "/listticketuser";
  };
  const handleChangePriority = (event) => {
    console.log(event.target.value)
    setPriority(event.target.value)
  };
  const handleAddTicket = () => {
    console.log(user_id)
    console.log(username)
    console.log(title)
    console.log(deskripsi)
    console.log(priority)

    axios.post("https://dainty-blini-408c4c.netlify.app/.netlify/functions/tickets-create", {user_id, username, title, deskripsi, priority, email, phone_no}, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    }).then(response => {

      const { data } = response
      console.log(data)
      //setResponse(data)
      
      swal("Success", "Ticket created", "success", {
        buttons: false,
        timer: 2000,
      })
      window.location.href = "/listticketuser";
  
    })      
    
};

return (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Create Ticket ({username})
        </Typography>
        <div>
          <IconButton onClick={handleMenu} color="inherit">
            <Avatar src={username.avatar} />
          </IconButton>
          <Menu id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleListTicket}>List Ticket</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
    <Grid container justify="center">
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField disabled
            id="filled-username"
            label="Username"
            value={username}
            variant="filled"
          />
        </div>
        <div>
          <TextField
            id="filled-title"
            label="Title"
            value={title}
            onChange={(newValue) => setTitle(newValue.target.value)}
            variant="filled"
          />
        </div>
        <div>
          <TextField
            id="filled-deskripsi"
            label="Deskripsi"
            maxRows={5}
            minRows={5}
            multiline
            value={deskripsi}
            onChange={(newValue) => setDeskripsi(newValue.target.value)}
            variant="filled"
          />
        </div>
        <div>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={priority}
              onChange={handleChangePriority}
            >
              <MenuItem value={'LOW'}>LOW</MenuItem>
              <MenuItem value={'NORMAL'}>NORMAL</MenuItem>
              <MenuItem value={'URGENT'}>URGENT</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Grid container justify='center'>
        <div>
          <Button className={classes.button} variant="contained" color="primary" onClick={() => handleAddTicket()}>
            Create Ticket
          </Button>
        </div>
        </Grid>
      </form>
    </Grid>
  </div >
);
}