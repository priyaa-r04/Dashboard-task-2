import { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import backgroundImage from '../assets/bg-signup.jpg';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { User, UserContext } from "../Components/ContextAPI/UserContext";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const SignupSchema = Yup.object().shape({
    name: Yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces')
        .required('Name is Required'),
    email: Yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Email must be a valid Gmail address.")
    .email('Invalid email')
    .required('Email is Required')
    .test('email-exists', 'Email already exists!', function (value) {
        if (!value) return true;
        try {
            const storedUsers = localStorage.getItem("users");
            const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
            return !users.some((user) => user.email === value);
        } catch (e) {
            console.error("Yup email test error:", e);
            return true;
        }
    }),
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
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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

            try {
                const storedUsers = localStorage.getItem("users");
                const usersFromStorage: User[] = storedUsers ? JSON.parse(storedUsers) : [];

                usersFromStorage.push(userData);
                localStorage.setItem("users", JSON.stringify(usersFromStorage));
                addUser(userData);

                setOpen(true);

            setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } catch (error) {
                console.error("Error adding user:", error);
            } finally {
                setLoaderState(false);
            }
        },


    });
    const handleClose = (_: any | Event, reason: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full"
                                error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
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
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full"
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
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
                                disabled={loaderState}
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
                        <Alert severity="success" sx={{ width: '100%' }}>
                        User successfully registered!
                    </Alert>
                    </Snackbar>

                </div>
            </div>
        </>
    );

};

export default SignUp