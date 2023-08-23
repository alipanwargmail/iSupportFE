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
import { Gif } from '@material-ui/icons';
import { useEffect } from 'react';

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

export default function EditTicketAgent() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id, setId] = React.useState('');
  const [user_id, setUser_id] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [handler_user_id, setHandler_user_id] = React.useState(null);
  const [handler_username, setHandlerUsername] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [deskripsi, setDeskripsi] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [response, setResponse] = React.useState('');
  const open = Boolean(anchorEl);
  console.log(localStorage.getItem('user_id'))
  const login_id = JSON.parse(localStorage.getItem('user_id'));
  const loginname = JSON.parse(localStorage.getItem('username'));
  const loginrole = JSON.parse(localStorage.getItem('role_user'));
  const loginemail = JSON.parse(localStorage.getItem('email'));
  const token = localStorage.getItem('token');
  const editticket_id = JSON.parse(localStorage.getItem('editticket_id'));

  console.log(editticket_id)
  useEffect(() => {
    console.log('enter useEffect')

    axios.get("http://localhost:3001/tickets/" + editticket_id, {
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
      setUser_id(data.user_id)
      setUsername(data.username)
      setHandler_user_id(data.handler_user_id)
      setHandlerUsername(data.handler_username)
      setTitle(data.title)
      setDeskripsi(data.deskripsi)
      setPriority(data.priority)
      setStatus(data.status)
setEmail(data.email)
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
  const handleChangeStatus = (event) => {    
    setStatus(event.target.value)
  };

  const handleEditTicket = () => {
    console.log(user_id)
    console.log(title)
    console.log(deskripsi)
    console.log(priority)

    axios.put("http://localhost:3001/tickets/" + editticket_id, { login_id, loginname, loginrole, loginemail, user_id, handler_user_id, username, handler_username, title, deskripsi, priority, status,email }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    }).then(response => {

      const { data } = response
      console.log(data)
      setResponse(data)

      swal("Success", "Ticket created", "success", {
        buttons: false,
        timer: 2000,
      })
      window.location.href = "/listticketagent";

    })

  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Edit Ticket ({loginname})
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
            <card>
            <TextField disabled
              id="filled-id"
              label="id"
              value={id}
              variant="filled"
            />
            </card>
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
              id="filled-handler-username"
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
              onChange={(newValue) => setTitle(newValue.target.value)}
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
              onChange={(newValue) => setDeskripsi(newValue.target.value)}
              variant="filled"
            />
          </div>
          <div>
            <TextField disabled
              id="filled-handler_priority"
              label="Priority"
              value={priority}
              variant="filled"
            />
          </div>
          <div>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={status}
                onChange={handleChangeStatus}
              >
                <MenuItem value={'CREATED'}>CREATED</MenuItem>
                <MenuItem value={'IN PROGRESS'}>IN PROGRESS</MenuItem>
                <MenuItem value={'DONE'}>DONE</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Grid container justify='center'>
            <div>
              <Button className={classes.button} variant="contained" color="primary" onClick={() => handleEditTicket()}>
                Edit Ticket
              </Button>
            </div>
          </Grid>
        </form>
      </Grid>
    </div >
  );
}