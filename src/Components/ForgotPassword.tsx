import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Password reset email sent to:', email);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Forgot Password</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{
                            '& .MuiInputLabel-root.Mui-focused': { color: '#881337' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#881337' },
                                '&:hover fieldset': { borderColor: '#701a30' },
                                '&.Mui-focused fieldset': { borderColor: '#701a30' },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ backgroundColor: '#881337', '&:hover': { backgroundColor: '#701a30' } }}>
                        Send Reset Link
                    </Button>
                </form>
                <Snackbar
                    anchorOrigin={{ horizontal: "center", vertical: "top" }}
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}>
                    <Alert severity="info" sx={{ width: '100%' }}>
                        Password reset link sent successfully!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default ForgotPassword;
