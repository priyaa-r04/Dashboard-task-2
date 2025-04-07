<<<<<<< HEAD
import React, { useState, useContext , useEffect} from "react";
=======
import  { useState, useContext } from "react";
>>>>>>> a3d35a7cdd9968c6fc577673bf08f0b342308bba
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import * as Yup from 'yup';
import { UserContext } from "../ContextAPI/UserContext";
import backgroundImage from '../assets/bg-signup.jpg'
import { Checkbox, FormControlLabel } from "@mui/material";
import SimpleBackdrop from "./Loader"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string().min(6, 'Password length must be 6').required('Password is Required'),
});

const LoginForm = () => {
  const { checkCredentials } = useContext(UserContext);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loaderState, setLoaderState] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setLoaderState(true);
      setTimeout(() => {
        const isValid = checkCredentials(values.email, values.password);
        setLoaderState(false);
        if (isValid) {
          setOpenSnackbar(true);

          localStorage.setItem("userData", JSON.stringify(values));

          setTimeout(() => navigate("/dashboard"), 2000);
        } else {
          setErrorSnackbar(true);
        }
      }, 2000);
    },
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userData") || '{}');

    if (savedUser) {
      formik.setValues(savedUser); 
    }
  }, []);

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    console.log(event);
    setOpenSnackbar(false);
    setErrorSnackbar(false);
  };

  return (
    <>
      <SimpleBackdrop loaderState={loaderState} setOpen={setLoaderState} />
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h1>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                type="email"
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
                type={"password"}
                placeholder="Enter your Password"
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

            <div className="flex items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: '#881337',
                      '&.Mui-checked': {
                        color: '#701a30',
                      },
                    }}
                  />
                }
                label="Remember Me"
              />
            </div>

            <div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={loaderState}
                sx={{
                  backgroundColor: '#881337',
                  '&:hover': { backgroundColor: '#701a30' }
                }}
              >
                {loaderState ? "Logging In..." : "Login"}
              </Button>
            </div>

          </form>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              New User?{" "}
              <span
                className="font-semibold cursor-pointer hover:underline"
                style={{ color: "#B02A47" }}
                onClick={() => navigate("/signup")}
              >
                Signup Here
              </span>
            </p>
          </div>


          <Snackbar
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              Login successful!
            </Alert>
          </Snackbar>

          <Snackbar
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            open={errorSnackbar}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              Invalid email or password!
            </Alert>
          </Snackbar>

        </div>
      </div>


    </>
  );
};



export default LoginForm;
