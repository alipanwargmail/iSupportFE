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

export default function EditTicketUser() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id, setId] = React.useState('');
  const [user_id, setUser_id] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [handler_user_id, setHandler_user_id] = React.useState(null);
  const [handler_username, setHandlerUsername] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [deskripsi, setDeskripsi] = React.useState('');
  const [priority, setPriority] = React.useState('NORMAL');
  const [status, setStatus] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [handler_email, setHandler_Email] = React.useState('');
  const [phone_no, setPhone_no] = React.useState('');
  const [handler_phone_no, setHandler_Phone_no] = React.useState('');
 // const [response, setResponse] = React.useState('');
  const open = Boolean(anchorEl);
  console.log(localStorage.getItem('user_id'))
  //const user_id = JSON.parse(localStorage.getItem('user_id'));
  const login_id = JSON.parse(localStorage.getItem('user_id'));
  const loginname = JSON.parse(localStorage.getItem('username'));
  const loginrole = JSON.parse(localStorage.getItem('role_user'));
  const loginemail = JSON.parse(localStorage.getItem('email'));
  const token = localStorage.getItem('token');
  const editticket_id = JSON.parse(localStorage.getItem('editticket_id'));
  //const anper = JSON.parse(localStorage.getItem('anper'));
  const [anper, setAnper] = React.useState('');

  console.log(editticket_id)
  useEffect(() => {
    console.log('enter useEffect')

    axios.get("https://dainty-blini-408c4c.netlify.app/.netlify/functions/tickets-get2?id=" + editticket_id, {
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
      setHandler_Email(data.handler_email)
      setPhone_no(data.phone_no)
      setHandler_Phone_no(data.handler_phone_no)
      setAnper(data.anper)
      //setResponse(data)
    })
  }, [editticket_id, token])

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
  const handleEditTicket = () => {
    console.log(user_id)
    console.log(title)
    console.log(deskripsi)
    console.log(priority)

    axios.put("http://localhost:3001/tickets/" + editticket_id, { login_id, loginname, loginrole, loginemail, user_id, handler_user_id, username, handler_username, title, deskripsi, priority, status, email, phone_no, handler_email, handler_phone_no }, {
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
            Edit Ticket ({loginname})
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
          </div>          <div>
            <TextField disabled
              id="filled-handler_status"
              label="Status"
              value={status}
              variant="filled"
            />
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