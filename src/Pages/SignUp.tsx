// src/Signup.tsx

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Card, CardContent, CardActions, Typography, Box } from '@mui/material';

// Validation Schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Signup: React.FC = () => {
  // Handle form submission
  const handleSubmit = (values: { username: string; email: string; password: string }) => {
    // Handle your form submission logic (API call, etc.)
    console.log(values);
  };

  return (
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card sx={{ maxWidth: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            Sign Up
          </Typography>

          {/* Formik Form */}
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Username Field */}
                  <Field
                    name="username"
                    as={TextField}
                    label="Username"
                    variant="outlined"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="username" />}
                    error={Boolean(<ErrorMessage name="username" />)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'black', // Red border color when error occurs
                        },
                        '&.Mui-error .MuiOutlinedInput-input': {
                          color: 'black', // Red text color when error occurs
                        },
                      },
                    }}
                  />

                  {/* Email Field */}
                  <Field
                    name="email"
                    as={TextField}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    type="email"
                    helperText={<ErrorMessage name="email" />}
                    error={Boolean(<ErrorMessage name="email" />)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'black', // Red border color when error occurs
                        },
                        '&.Mui-error .MuiOutlinedInput-input': {
                          color: 'black', // Red text color when error occurs
                        },
                      },
                    }}
                  />

                  {/* Password Field */}
                  <Field
                    name="password"
                    as={TextField}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    type="password"
                    helperText={<ErrorMessage name="password" />}
                    error={Boolean(<ErrorMessage name="password" />)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'black', // Red border color when error occurs
                        },
                        '&.Mui-error .MuiOutlinedInput-input': {
                          color: 'black', // Red text color when error occurs
                        },
                      },
                    }}
                  />
                </Box>

                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </Button>
                </CardActions>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
