import { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import backgroundImage from '../assets/bg-signup.jpg';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { User, UserContext } from "../ContextAPI/UserContext";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress';

const SignupSchema = Yup.object().shape({
    name: Yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces')
        .required('Name is Required'),
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup
        .string()
        .min(6, 'Password length must be 6')
        .matches(/^(?=.*[A-Z])(?=.*[\d!@#$%^&*(),.?":{}|<>]).*$/,
            'Password must contain at least one uppercase letter and one number or special character')
        .required('Password is Required'),
});

const SignUp = () => {
    const { addUser } = useContext(UserContext)!;
    const [loaderState, setLoaderState] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            setLoaderState(true);
           
            const userData: User = {
                ...values,
                createdDate: new Date().toISOString(), 
                active: true, 
            };
    
            let usersFromStorage: User[] = [];
        try {
            const storedUsers = localStorage.getItem("users");
            if (storedUsers) {
                usersFromStorage = JSON.parse(storedUsers);
            }
        } catch (e) {
            console.error("Error reading from localStorage:", e);
        }

        const isEmailAlreadyExist = usersFromStorage.some((existingUser) => existingUser.email === userData.email);
        
        if (isEmailAlreadyExist) {
            setLoaderState(false);
            setError(true);
            setOpen(true); 
            return; 
        }

        try {
            usersFromStorage.push(userData);
            localStorage.setItem("users", JSON.stringify(usersFromStorage));
            console.log("User data added via addUser");

            addUser(userData);
        } catch (error) {
            console.error("Error adding user:", error);
        }

            setTimeout(() => {
                setLoaderState(false);
                setOpen(true);

                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }, 1000);
        },


    });
    const handleClose = (event: any | Event, reason: string) => {
        if (reason === 'clickaway') return;
        console.log(event);
        setOpen(false);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(event);
        const email = event.target.value;

        // Check if the email exists in localStorage
        let usersFromStorage: User[] = [];
        try {
            const storedUsers = localStorage.getItem("users");
            if (storedUsers) {
                usersFromStorage = JSON.parse(storedUsers);
            }
        } catch (e) {
            console.error("Error reading from localStorage:", e);
        }

        const emailExists = usersFromStorage.some((existingUser) => existingUser.email === email);
        setEmailExists(emailExists); 
    };


    return (
        <>
            <div
                className="flex justify-center items-center min-h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="bg-white shadow-xl  rounded-xl p-6 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h1>


                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full"
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                sx={{
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#881337',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#881337',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#701a30',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#701a30',
                                        },
                                    },
                                }}

                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={handleEmailChange}
                                onBlur={formik.handleBlur}
                                className="w-full"
                                error={emailExists || (formik.touched.email && Boolean(formik.errors.email))}
                                helperText={
                                    emailExists
                                        ? 'Email already exists!'
                                        : formik.touched.email && formik.errors.email
                                }

                                sx={{   
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#881337',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#881337',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#701a30',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#701a30',
                                        },
                                    },
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type={'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full"
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                sx={{
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#881337',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#881337',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#701a30',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#701a30',
                                        },
                                    },
                                }}
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                type="submit"
                                disabled={loaderState || emailExists}
                                sx={{ backgroundColor: '#881337', '&:hover': { backgroundColor: '#701a30' } }}
                            >
                               {loaderState ? (
                                    <CircularProgress size={24} sx={{ color: 'white' }} />
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            Already Registered?{" "}
                            <span
                                className="font-semibold cursor-pointer hover:underline"
                                style={{ color: "#B02A47" }}
                                onClick={() => navigate("/login")}
                            >
                                Login Here
                            </span>
                        </p>
                    </div>

                    <Snackbar
                        anchorOrigin={{ horizontal: "center", vertical: "top" }}
                        open={open}
                        autoHideDuration={1000}
                        onClose={handleClose}
                    >
                        <Alert severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
                            {error ? 'Email already exists!' : 'User successfully registered!'}
                        </Alert>
                    </Snackbar>

                </div>
            </div>
        </>
    );

};

export default SignUp