import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Grid} from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Home({ url }) {
  const [data, setData] = useState({});
  const [key, setKey] = useState('');
  const [userId, setUserId] = useState('');
  const [userid, setUserid] = useState('');
  const [usertitle, setUsertitle] = useState('');
  const [userbody, setUserbody] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url]);

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleFetchData = () => {
    if (key && data[key]) {
      setUserId(data[key].userId);
      setUserid(data[key].id);
      setUsertitle(data[key].title);
      setUserbody(data[key].body);

    } else {
      setUserId('User not found');
      setUserid('');
      setUsertitle('');
      setUserbody('');
    }
  };

  const handleDeleteData = () => {
    if (key && data[key]) {
      const newData = { ...data };
      delete newData[key];
      setData(newData);
      setUserId('');
      setUserid('');
      setUsertitle('');
      setUserbody('');
      setKey('');
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Grid container spacing={2}>
    {Object.entries(data).map(([key, value]) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
      <Card key={key} variant="outlined" style={{ marginBottom: '20px' }} onClick={handleClickOpen}>
      
      <CardContent   >
        
        <Typography variant="h5" component="div">
          User Data Fetcher
          </Typography>
          <Typography variant="body2" color="textSecondary">
          <strong>User ID:</strong>  {value.userId}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            <strong> ID:</strong> {value.id}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            <strong>Title:</strong> {value.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            <strong>Body:</strong> {value.body}
            </Typography>
        
        
        <Button variant="contained" color="secondary" onClick={handleDeleteData}>
          Delete Data
        </Button>
        
      </CardContent>
      
      <Dialog
        open={open}
        onClose={handleClose}>
<DialogContent>
<Typography variant="body2" color="textSecondary">
          <strong>User ID:</strong>  {value.userId}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            <strong> ID:</strong> {value.id}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            <strong>Title:</strong> {value.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            <strong>Body:</strong> {value.body}
            </Typography>
</DialogContent>
<DialogActions>
          <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogActions>
        </Dialog>
      
    </Card>
    </Grid>
    ))}
     </Grid>
  );
 
}

export default Home;
