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
import { useEffect } from 'react';
import axios from 'axios';

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


export default function ListTicketAgent() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [response, setResponse] = React.useState(null);

    const open = Boolean(anchorEl);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('username'));
    const user_id = JSON.parse(localStorage.getItem('user_id'));

    useEffect(() => {
console.log(user_id);
        axios.get("https://dainty-blini-408c4c.netlify.app/.netlify/functions/tickets-getbyhandler?id="+user_id, {            
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'authorization': 'Bearer ' + token
            }
        }).then(response => {

            const { data } = response
            setResponse(data)
        })
    }, [user_id, token])

    console.log(token)

    function handleViewTicketAgent(id) {
        console.log(id)
        localStorage.setItem('viewticket_id', id);
        window.location.href = "/viewticketagent";
    }
    function handleEditTicketAgent(id) {
        console.log(id)
        localStorage.setItem('editticket_id', id);
        window.location.href = "/editticketagent";
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };
    const handleListTicket = () => {
        window.location.href = "/listticketagent";
    };    
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        List Ticket ({user})
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
                            <MenuItem onClick={handleListTicket}>List Ticket</MenuItem>
                            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Handler</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Deskripsi</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {response ? response.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.handler_username}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.deskripsi}</TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.created_at}</TableCell>
                                <TableCell>
                                    <Button color="primary" variant="contained" onClick={() => handleViewTicketAgent(row.id)}>View</Button>
                                    <Button color="secondary" variant="contained" onClick={() => handleEditTicketAgent(row.id)}>Edit</Button>
                                </TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}