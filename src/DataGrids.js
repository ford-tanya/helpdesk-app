import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import InfoIcon from '@mui/icons-material/Info';
import AddTaskIcon from '@mui/icons-material/AddTask';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import moment from 'moment/moment';

//Styling components for a Bootstrap-style dialog box.
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DataGrids() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    getTicket()
  }, [])
  
  //Request to get all tickets and update the state with their details
  const getTicket = () => {
    fetch("http://localhost:8000/ticket/getTicket")
      .then(res => res.json())
      .then(
        (result) => {
          const rowsWithId = result.data.map((row) => ({
            ...row,
            id: row.ticket_id,
            update_time: moment(row.update_time).toDate(),
            status: row.status_name,
          }));
          setRows(rowsWithId);
        }
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  //Request to get ticket by its ID and update the state with its details
  const getTicketById = React.useCallback(
    (id) => {
      fetch("http://localhost:8000/ticket/getTicketById/"+id)
      .then(res => res.json())
      .then(
        (result) => {
          setId(result.data.ticket_id);
          setTitle(result.data.title);
          setDescription(result.data.description);
          setContact(result.data.contact);
          setCreated_time(moment(result.data.created_time).format('DD/MM/YYYY, hh:mm:ss A'));
          setUpdate_time(moment(result.data.update_time).format('DD/MM/YYYY, hh:mm:ss A'));
          setStatus_name(result.data.status_name);
        }
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    },
    [],
  );

  //Request to update the status of a ticket 
  const setStatus = React.useCallback(
    (id, status) => () => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "ticket_id": id,
        "status_id": status
      });

      let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:8000/ticket/updateTicketStatus", requestOptions)
        .then(response => response.text())
        .then(result => {getTicket(); setOpenInfo(false);})
        .catch(error => console.log('error', error));
    },
    [],
  );
  
  //Request to create a new ticket with the given data, then updates the ticket list and hides the form
  const handleSubmit = event => {
    event.preventDefault();
    let data = {
      'title': newTitle,
      'description': newDescription,
      'contact': newContact,
      'status_id': 1,
    }
    fetch('http://localhost:8000/ticket/createTicket', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => {res.json(); getTicket(); setCreateState(false);})
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  //Request to update a ticket and then retrieves the updated ticket data
  const handleUpdate = event => {
    event.preventDefault();
    let data = {
      'ticket_id': id,
      'title': newTitle,
      'description': newDescription,
      'contact': newContact,
    }
    fetch('http://localhost:8000/ticket/updateTicket', {
      method: 'PUT',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => {res.json(); getTicket(); setUpdateState(false);})
    .catch(error => console.log('error', error));
  }

  //Define and initialize state variables for ticket info
  const [id, setId] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [created_time, setCreated_time] = React.useState('');
  const [update_time, setUpdate_time] = React.useState('');
  const [status_name, setStatus_name] = React.useState('');
  
  //State variables for new ticket info
  const [newTitle, setNewTitle] = React.useState('');
  const [newDescription, setNewDescription] = React.useState('');
  const [newContact, setNewContact] = React.useState('');

  //Open/close state of dialogs for showing 
  //ticket information, creating a new ticket, and updating an existing ticket
  const [openInfoState, setOpenInfo] = React.useState(false);
  const [openCreateState, setCreateState] = React.useState(false);
  const [openUpdateState, setUpdateState] = React.useState(false);

  //Function to handle opening of dialog windows
  const OpenInfo = React.useCallback(
    (id) => () => {
      getTicketById(id);
      setOpenInfo(true);
    },
    [getTicketById]
  );

  const OpenCreate = React.useCallback(
    () => {
      setCreateState(true);
    },
    [],
  );

  const OpenUpdate = React.useCallback(
    () => {
      setOpenInfo(false);
      setUpdateState(true);
    },
    [],
  );
  
  // Function to handle closing of dialog windows
  const handleClose = () => {
    setOpenInfo(false);
    setCreateState(false);
    setUpdateState(false);
  };

  // Columns configuration for the DataGrid component with fields 
  // title, update time, status, and actions for each row, including icons and labels for each action
  const columns = React.useMemo(
  () => [
    { field: 'title', headerName: 'Title', type: 'string', width: 250 },
    { field: 'update_time', headerName: 'Update Time', type: 'dateTime', width: 300 },
    { field: 'status', headerName: 'Status', type: 'string', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      align: 'right',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<InfoIcon />}
          label="Info"
          onClick={() => OpenInfo(params.id)()}
        />,
        <GridActionsCellItem
          icon={<PendingActionsIcon />}
          label="pending"
          onClick={() => setStatus(params.id, 1)()}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<AddTaskIcon />}
          label="accepted"
          onClick={() => setStatus(params.id, 2)()}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<OfflinePinIcon />}
          label="resolved"
          onClick={() => setStatus(params.id, 3)()}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DoDisturbOnIcon />}
          label="rejected"
          onClick={() => setStatus(params.id, 4)()}
          showInMenu
        />
      ]
    }
  ],
  [OpenInfo, setStatus]
  );

  return (
  <Container sx={{ p:2 }} maxWidth="md">
    {/*Paper component containing a button for creating a new ticket and a DataGrid displaying a list of tickets*/}
    <Paper sx={{ p:2 }}>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Tickets List
          </Typography>
        </Box>
        <Box>
            <Button variant="contained" color="primary" onClick={() => OpenCreate() }>
              CREATE
            </Button>
        </Box>
        
      </Box>
      <div style={{ height: 500, width: '100%', marginTop: '16px' }}>
        <DataGrid columns={columns} rows={rows} />
      </div>
    </Paper>

    {/*BootstrapDialog component for displaying information about a ticket and allowing editing*/}
    <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openInfoState}
        fullWidth={true}
    >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <span style={{color: "#757de8"}}>Description:</span>
            <br />
            {description}
          </Typography>
          <Typography gutterBottom>
            <span style={{ color: "#00a152" }}>Contact information:</span>{" "}
            {contact}
          </Typography>
          <Typography gutterBottom>
          <span style={{ color: "gray" }}>Created time: </span>{" "}
            {created_time}</Typography>
          <Typography gutterBottom>
          <span style={{ color: "gray" }}>Update time: </span>{" "}
            {update_time}
          </Typography>
          <Typography gutterBottom>
          <span style={{ color: "black" }}>Tickets status: </span>{" "}
            {status_name}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={OpenUpdate} color="info">
            Edit
          </Button>
          <Button autoFocus onClick={handleClose} color="info">
            Close
          </Button>
        </DialogActions>
    </BootstrapDialog>

    {/*Dialog component with a form for creating a new ticket*/}
    <Dialog 
    open={openCreateState} 
    onClose={handleClose}>
    <form onSubmit={handleSubmit}>
            <DialogTitle>Create Ticket</DialogTitle>
            <DialogContent>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Title"
                  type="text"
                  fullWidth
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <TextField
                  required
                  margin="dense"
                  id="description"
                  label="Description"
                  multiline
                  rows={3}
                  defaultValue=""
                  fullWidth
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <TextField
                  required
                  margin="dense"
                  id="contact"
                  label="Contact"
                  type="text"
                  fullWidth
                  onChange={(e) => setNewContact(e.target.value)}
                />
            </DialogContent>
            
            <DialogActions >
                  <Button type="submit">CREATE</Button>
                  <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>

    </form>
    </Dialog>

    {/*Dialog component with a form for updating a ticket*/}
    <Dialog 
    open={openUpdateState} 
    onClose={handleClose}>
    <form onSubmit={handleUpdate}>
            <DialogTitle>Edit Ticket</DialogTitle>
            <DialogContent>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Title"
                  type="text"
                  fullWidth
                  defaultValue= {title}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <TextField
                  required
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  multiline
                  rows={3}
                  defaultValue= {description}
                  fullWidth
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <TextField
                  required
                  margin="dense"
                  id="contact"
                  label="Contact"
                  type="text"
                  fullWidth
                  defaultValue= {contact}
                  onChange={(e) => setNewContact(e.target.value)}
                />
            </DialogContent>
            <DialogActions >
                  <Button type="submit">Update</Button>
                  <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
    </form>
    </Dialog>

  </Container>
  );
}
