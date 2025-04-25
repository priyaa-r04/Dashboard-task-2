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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import EditUserModal from "../Contact/EditUserModal";

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
  handleUpdatePhone: (email: string, phone: string) => void;
}

const ContactList = ({ searchTerm, users, handleUpdatePhone }: Props) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  const handleDeletePhone = (email: string) => {
    handleUpdatePhone(email, "");
    setOpenDeleteDialog(false);
  };

  const openDeleteConfirmation = (email: string) => {
    setUserToDelete(email);
    setOpenDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleOpenEditModal = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  if (filteredUsers.length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        There are no contact details.
      </Typography>
    );
  }

  return (
    <Paper elevation={3} sx={{ mt: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
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
              <TableCell>
                {user.phone ? (
                  user.phone
                ) : (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      textAlign: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    -
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Box display="flex" gap={1}>
                  <IconButton
                    color="primary"
                    onClick={() => alert(`Viewing ${user.name}'s details`)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    color="info"
                    onClick={() => handleOpenEditModal(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => openDeleteConfirmation(user.email)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDeleteDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete the phone number for this contact?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => userToDelete && handleDeletePhone(userToDelete)}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {selectedUser && (
        <EditUserModal
          open={editModalOpen}
          onClose={handleCloseEditModal}
          selectedUser={selectedUser}
        />
      )}
    </Paper>
  );
};

export default ContactList;
