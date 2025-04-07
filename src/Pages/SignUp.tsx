import { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import backgroundImage from '../assets/bg-signup.jpg';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from "../ContextAPI/UserContext";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'
import SimpleBackdrop from "./Loader";

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

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            console.log(values);
            setLoaderState(true);

            localStorage.setItem('userData', JSON.stringify(values));

            addUser(values);

            setTimeout(() => {
                setLoaderState(false);
                setOpen(true);

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }, 2000);
        },


    });
    const handleClose = (event: React.SyntheticEvent | Event, reason: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };


    return (
        <>
            <SimpleBackdrop loaderState={loaderState} setOpen={setLoaderState} />
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
                                disabled={loaderState}
                                sx={{ backgroundColor: '#881337', '&:hover': { backgroundColor: '#701a30' } }}
                            >
                                {loaderState ? "Signing Up..." : "Sign Up"}
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
                        autoHideDuration={2000}
                        onClose={handleClose}>

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