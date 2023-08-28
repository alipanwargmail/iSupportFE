import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core/';
//import TableContainer from '@material-ui/core/TableContainer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

/*


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
*/

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
}));

const tableData = [
    {
        id: 1,
        name: 'Suraj',
        age: 30,
        address: 'Gujrat'
    },
    {
        id: 2,
        name: 'Vir',
        age: 25,
        address: 'Vihar'
    },
    // Add more objects as needed
];
export default function ListUser() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [response, setResponse] = React.useState(null);
    const open = Boolean(anchorEl);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('username'));

    useEffect(() => {

        axios.get("https://dainty-blini-408c4c.netlify.app/.netlify/functions/users-getall", {            
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'authorization': 'Bearer ' + token
            }
        }).then(response => {

            const { data } = response
            setResponse(data)
        })
    }, [])

    console.log(token)

    //function componentDidMount(){
    //getAllUsers(token)
    //}

    /*
    async function getAllUsers(token) {
        const response = await getUsers(token);
        console.log(response);
        setResponse(response)
    }
    */


    function handleDeleteUser(id, username) {
        // Define the logic for handling the button click here
        //console.log(`Button clicked for row with id ${id}`);
        
        //if (window.confirm('Are you sure you wish to delete '+id+' ?')) deleteIntent(id) 
        swal({
            title: "Are you sure ??",
            text: 'Are you sure you wish to delete '+id+', username: '+username+' ?', 
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            deleteIntent(id)
            /*swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });            */
          } else {
            //swal("Your imaginary file is safe!");
          }
        });
    }
    function deleteIntent(id){
        //axios.delete("http://localhost:3001/users/"+id, {            
        axios.delete("https://dainty-blini-408c4c.netlify.app/.netlify/functions/users-delete?/"+id, {            
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'authorization': 'Bearer ' + token
            }
        }).then(response => {

            const { data } = response
            window.location.reload()
            swal("return from server",data)
        })
    }

    function handleUpdateUser(id) {
        localStorage.setItem('edited_id', id);
        window.location.href = "/edituser";
    }

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


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        List User
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
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone No</TableCell>
                            <TableCell>Role User</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {response ? response.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone_no}</TableCell>
                                <TableCell>{row.role_user}</TableCell>
                                <TableCell>
                                    <Button color="primary" variant="contained" onClick={() => handleUpdateUser(row.id)}>Update</Button>
                                    <Button color="secondary" variant="contained" onClick={() => handleDeleteUser(row.id, row.username)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}