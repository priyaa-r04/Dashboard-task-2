import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onAddUser: (user: { name: string; email: string; phone: string }) => void;
}

const ContactDialog = ({ open, onClose, onAddUser }: Props) => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const user = {
      name: `${formData.firstName} ${formData.lastName}`, 
      email: formData.email,
      phone: formData.phone,
    };
    
    onAddUser(user); 
    onClose();
    setFormData({ firstName: '', lastName: '', email: '', phone: '' });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Contact Details</DialogTitle>
      <DialogContent>
        <Box display="flex" gap={2}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Box>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Add Contact
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactDialog;
