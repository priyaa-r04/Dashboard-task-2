import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Paper,
  Button,
} from '@mui/material';

interface User {
  name: string;
  email: string;
  phone: string;
  profileImageUrl?: string;
}

interface Props {
  searchTerm: string;
  users: User[];
  handleDeleteUser: (email: string) => void;
}

const ContactList = ({ searchTerm, users, handleDeleteUser }: Props) => {
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  if (filteredUsers.length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        There is No Contact Details
      </Typography>
    );
  }

  return (
    <Paper elevation={3} sx={{ mt: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ mr: 1 }} src={user.profileImageUrl}>
                    {user.name[0]}
                  </Avatar>
                  {user.name}
                </Box>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDeleteUser(user.email)}
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ContactList;
