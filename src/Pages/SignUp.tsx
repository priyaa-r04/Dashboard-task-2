import  { useContext } from "react";
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import backgroundImage from '../assets/bg-signup.jpg'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from "./UserContext";


const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().min(6, 'Password length must be 6').required('Password is Required'),
});

const SignUp = () => {
    const { addUser } = useContext(UserContext)!;

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
            addUser(values);
            navigate("/login")
        },


    });

    return (
        <>
            <div
                className="flex justify-center items-center min-h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
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


                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full"
                                error={formik.touched.password && Boolean(formik.errors.password)} 
                                helperText={formik.touched.password && formik.errors.password} 

                            />
                        </div>
                        <div>
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                type="submit"
                                sx={{ backgroundColor: '#881337', '&:hover': { backgroundColor: '#701a30' } }}>
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );

};

export default SignUp