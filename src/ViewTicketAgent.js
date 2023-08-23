import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button, FormControl, FormHelperText, Select, InputLabel, Grid, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import swal from 'sweetalert';
import { useEffect } from 'react';
import { Gif } from '@material-ui/icons';

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

export default function ViewTicketAgent() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id, setId] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [handler_username, setHandlerUsername] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [deskripsi, setDeskripsi] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [response, setResponse] = React.useState('');
  const open = Boolean(anchorEl);
  //const username = JSON.parse(localStorage.getItem('username'));
  //console.log(localStorage.getItem('user_id'))
  //const user_id = JSON.parse(localStorage.getItem('user_id'));
  const token = localStorage.getItem('token');
  const viewticket_id = JSON.parse(localStorage.getItem('viewticket_id'));

  console.log(viewticket_id)
  useEffect(() => {
    console.log('enter useEffect')

    axios.get("http://localhost:3001/tickets/" + viewticket_id, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    }).then(response => {
      console.log("response: " + response)
      const { data } = response
      console.log("data " + data)

      setId(data.id)
      setUsername(data.username)
      setHandlerUsername(data.handler_username)
      setTitle(data.title)
      setDeskripsi(data.deskripsi)
      setPriority(data.priority)
      setStatus(data.status)

      setResponse(data)
    })
  }, [])
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleListTicket = () => {
    window.location.href = "/listticketagent";
  };
  const handleChangePriority = (event) => {
    console.log(event.target.value)
    setPriority(event.target.value)
  };
  const handleBack = () => {

    window.location.href = "/listticketagent";

  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            View Ticket
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
              id="filled-id"
              label="id"
              value={id}
              variant="filled"
            />
          </div>
          <div>
            <TextField disabled
              id="filled-username"
              label="Username"
              value={username}
              variant="filled"
            />
          </div>
          <div>
            <TextField disabled
              id="filled-handler_username"
              label="Handler Username"
              value={handler_username}
              variant="filled"
            />
          </div>
          <div>
            <TextField disabled
              id="filled-title"
              label="Title"
              value={title}
              variant="filled"
            />
          </div>
          <div>
            <TextField disabled
              id="filled-deskripsi"
              label="Deskripsi"
              maxRows={5}
              minRows={5}
              multiline
              value={deskripsi}
              variant="filled"
            />
          </div>
          <div>
            <TextField disabled
              id="filled-priority"
              label="Priority"
              value={priority}
              variant="filled"
            />
          </div>
          <div>
            <TextField disabled
              id="filled-status"
              label="Status"
              value={status}
              variant="filled"
            />
          </div>

          <Grid container justify='center'>
            <div>
              <Button className={classes.button} variant="contained" color="primary" onClick={() => handleBack()}>
                Back To List Ticket
              </Button>
            </div>
          </Grid>
        </form>
      </Grid>
    </div >
  );
}