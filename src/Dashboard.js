import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";


import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
  Legend,
  Title
} from '@devexpress/dx-react-chart-material-ui';
import axios from 'axios';
import { Stack, Animation } from "@devexpress/dx-react-chart";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  chart: {
    flexDirection: "row"
  },
  chartsmall:{
    width: "45%",
    display: "grid"
  }
}));



export default function Dashboard() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  //const [data, setData] = React.useState([]);
  //const [data2, setData2] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);
  const [askrindoData, setAskrindoData] = React.useState([]);
  const [bsData, setBsData] = React.useState([]);
  
  const anchoropen = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem('username'));
  const user_id = JSON.parse(localStorage.getItem('user_id'));
  const token = localStorage.getItem('token');
  console.log(user_id)
  
  /*
  const chartData = [
    { anper: 'Askrindo', open: '5', inprogress: '1', done: '2' },
    {
      anper: 'Bahana Artha Ventura',
      open: '5',
      inprogress: '1',
      done: '2'
    },
    {
      anper: 'Bahana Kapital Investa',
      open: '3',
      inprogress: '2',
      done: '3'
    },
    { anper: 'Bahana Sekuritas', open: '10', inprogress: '4', done: '7' },
    {
      anper: 'Bahana TCW Investment Management',
      open: '4',
      inprogress: '1',
      done: '3'
    },
    {
      anper: 'Grahaniaga Tatautama',
      open: '4',
      inprogress: '1',
      done: '3'
    },
    { anper: 'IFG', open: '3', inprogress: '1', done: '2' },
    { anper: 'IFG Holding', open: '5', inprogress: '1', done: '2' },
    { anper: 'IFG Life', open: '5', inprogress: '1', done: '2' },
    { anper: 'Jamkrindo', open: '4', inprogress: '1', done: '3' },
    { anper: 'Jasa Raharja', open: '3', inprogress: '2', done: '3' },
    { anper: 'Jasindo', open: '7', inprogress: '3', done: '6' }
  ]
  */
  
  useEffect(() => {
    console.log('enter useEffect')
    axios.get("https://dainty-blini-408c4c.netlify.app/.netlify/functions/dashboardticketsbyanper/", {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    }).then(response => {
      var objects = response.data.all;
      for (var i = 0; i < objects.length; i++) {
        var obj = objects[i];
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setChartData(objects)
      objects = response.data.askrindo;
      for (var i = 0; i < objects.length; i++) {
        var obj = objects[i];
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setAskrindoData(objects)
      objects = response.data.bs;
      for (var i = 0; i < objects.length; i++) {
        var obj = objects[i];
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setBsData(objects)
    })
  }, [token])

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
  const handleListTicket = () => {
    window.location.href = "/listticket";
  };
  const handleCreateUser = () => {
    window.location.href = "/createuser";
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar src={user.avatar} />
            </IconButton>
            <Button color="inherit" onClick={handleDashboard}>Dashboard</Button>
            <Button color="inherit" onClick={handleListTicket}>List Ticket</Button>
            <Button color="inherit" onClick={handleListUser}>List User</Button>
            <Button color="inherit" onClick={handleCreateUser}>Create User</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            <Menu id="menu-appbar"
              anchorEl={anchorEl}
              open={anchoropen}
              onClose={handleClose}
            >
              <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
              <MenuItem onClick={handleListUser}>List User</MenuItem>
              <MenuItem onClick={handleCreateUser}>Create User</MenuItem>
              <MenuItem onClick={handleListTicket}>List Ticket</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Avatar src={user.avatar} className={classes.large} />
          <Typography variant="h5">
            Welcome {user}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.root} variant="outlined">
      <Paper className={classes.chart} variant="outlined">
        <fieldset>
         <Chart data = {chartData}>
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries
               name = "OPEN"
               valueField = "open"
               argumentField = "anper"
               color = "red"
            />
            <BarSeries
               name = "IN PROGRESS"
               valueField = "inprogress"
               argumentField = "anper"
               color = "blue"
            />
            <BarSeries
               name = "DONE"
               valueField = "done"
               argumentField = "anper"
               color = "green"
            />
            <Animation />
            <Legend position = "bottom" />
            <Title text = "Distribusi status ticket by anper" />
            <Stack />
         </Chart>
         </fieldset>
         </Paper>         
         <fieldset>
         <Paper className={classes.chartsmall} variant="outlined">
        
         <Chart data = {askrindoData}>
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries
               name = "OPEN"
               valueField = "open"
               argumentField = "handler_username"
               color = "red"
            />
            <BarSeries
               name = "IN PROGRESS"
               valueField = "inprogress"
               argumentField = "handler_username"
               color = "blue"
            />
            <BarSeries
               name = "DONE"
               valueField = "done"
               argumentField = "handler_username"
               color = "green"
            />
            <Animation />
            <Legend position = "bottom" />
            <Title text = "Distribusi status ticket by CS Askrindo" />
            <Stack />
         </Chart>
         
         </Paper>         

         <Paper className={classes.chartsmall} variant="outlined">        
         <Chart data = {bsData}>
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries
               name = "OPEN"
               valueField = "open"
               argumentField = "handler_username"
               color = "red"
            />
            <BarSeries
               name = "IN PROGRESS"
               valueField = "inprogress"
               argumentField = "handler_username"
               color = "blue"
            />
            <BarSeries
               name = "DONE"
               valueField = "done"
               argumentField = "handler_username"
               color = "green"
            />
            <Animation />
            <Legend position = "bottom" />
            <Title text = "Distribusi status ticket by CS Bahana Sekuritas" />
            <Stack />
         </Chart>
         
         </Paper>         
         </fieldset>
      </Card>
    </div>
  );
}