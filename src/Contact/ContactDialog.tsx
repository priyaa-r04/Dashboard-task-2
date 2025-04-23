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

  const [errors, setErrors] = useState({
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

  const validateForm = () => {
    const newErrors = {
      firstName: formData.firstName ? '' : 'First name is required',
      lastName: formData.lastName ? '' : 'Last name is required',
      email: formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? '' : 'Invalid email address',
      phone: formData.phone && /^[0-9]{10}$/.test(formData.phone) ? '' : 'Phone number must be 10 digits',
    };
    
    setErrors(newErrors);
    
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const user = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
      };
      onAddUser(user);
      onClose();
      setFormData({ firstName: '', lastName: '', email: '', phone: '' });
    }
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
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Box>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.phone}
          helperText={errors.phone}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!!Object.values(errors).find((error) => error)}>
          Add Contact
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactDialog;
