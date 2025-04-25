import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
  } from '@mui/material';
  import { useDispatch } from 'react-redux';
  import { updateUser } from '../Store/UserSlice';
  import { useState, useEffect } from 'react';
  
  interface User {
    name: string;
    email: string;
    phone: string;
  }
  
  interface Props {
    open: boolean;
    onClose: () => void;
    selectedUser: User;
  }
  
  const EditUserModal = ({ open, onClose, selectedUser }: Props) => {
    const dispatch = useDispatch();
  
    const [formData, setFormData] = useState<User>(selectedUser);
  
    useEffect(() => {
      setFormData(selectedUser);
    }, [selectedUser]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSave = () => {
      dispatch(updateUser(formData));
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField name="name" label="Name" value={formData.name} onChange={handleChange} />
            <TextField name="email" label="Email" value={formData.email} disabled />
            <TextField name="phone" label="Phone" value={formData.phone} onChange={handleChange} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default EditUserModal;
  