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

export default function ViewTicket() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id, setId] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [handler_username, setHandlerUsername] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [deskripsi, setDeskripsi] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [status, setStatus] = React.useState('');
  //const [response, setResponse] = React.useState('');
  const open = Boolean(anchorEl);
  //const username = JSON.parse(localStorage.getItem('username'));
  //console.log(localStorage.getItem('user_id'))
  //const user_id = JSON.parse(localStorage.getItem('user_id'));
  const token = localStorage.getItem('token');
  const viewticket_id = JSON.parse(localStorage.getItem('viewticket_id'));
  const [anper, setAnper] = React.useState('');

  console.log(viewticket_id)
  useEffect(() => {
    console.log('enter useEffect')

    axios.get("https://dainty-blini-408c4c.netlify.app/.netlify/functions/tickets-get2?id=" + viewticket_id, {
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
      setAnper(data.anper)

      //setResponse(data)
    })
  }, [viewticket_id, token])
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleListTicket = () => {
    window.location.href = "/listticket";
  };

  const handleBack = () => {

    window.location.href = "/listticket";

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
            <Button color="inherit" onClick={handleListTicket}>List Ticket</Button>
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
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Anper</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={anper}
              disabled
              //onChange={handleChangeAnper}
            >
              <MenuItem value={'IFG Holding'} >IFG Holding</MenuItem>
              <MenuItem value={'Askrindo'}>Askrindo</MenuItem>
              <MenuItem value={'BAV'}>Bahana Artha Ventura</MenuItem>
              <MenuItem value={'BKI'}>Bahana Kapital Investa</MenuItem>
              <MenuItem value={'BS'}>Bahana Sekuritas</MenuItem>
              <MenuItem value={'BTIM'}>Bahana TCW Investment Management</MenuItem>
              <MenuItem value={'GNTU'}>Grahaniaga Tatautama</MenuItem>
              <MenuItem value={'IFG Life'}>IFG Life</MenuItem>
              <MenuItem value={'Jamkrindo'}>Jamkrindo</MenuItem>
              <MenuItem value={'Jasa Raharja'}>Jasa Raharja</MenuItem>
              <MenuItem value={'Jasindo'}>Jasindo</MenuItem>
            </Select>
          </FormControl>
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