import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, setUsers } from '../Store/UserSlice'; 
import ContactDialog from './ContactDialog';
import ContactList from './ContactList';

interface User {
  name: string;
  email: string;
  phone: string;
  profileImageUrl?: string;
}

interface RootState {
  users: {
    users: User[]; 
  };
}

const Contact = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      dispatch(setUsers(JSON.parse(storedUsers)));
    }
  }, [dispatch]);

  const handleAddUser = (user: { name: string; email: string; phone: string }) => {
    dispatch(addUser(user));
    localStorage.setItem('users', JSON.stringify([...users, user]));
  };

  const handleDeleteUser = (email: string) => {
    dispatch(deleteUser(email));
    localStorage.setItem('users', JSON.stringify(users));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        User Contact Details
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        component={Paper}
        sx={{ p: 2 }}
      >
        <TextField
          label="Search Contacts"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: 'gray' }} />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          Add Contact
        </Button>
      </Box>

      <ContactList
        searchTerm={searchTerm}
        users={users} 
        handleDeleteUser={handleDeleteUser} 
      />

      <ContactDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAddUser={handleAddUser} 
      />
    </Box>
  );
};

export default Contact;
