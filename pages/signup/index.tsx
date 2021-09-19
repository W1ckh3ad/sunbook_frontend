import * as React from 'react';
import {
    TextField,
    Box,
    Typography,
    Container,
    Button,
    Avatar,
    Checkbox,
    Link,
    FormControlLabel,
    Grid,
  } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik, FormikHelpers } from 'formik';
import * as yup from "yup";
import { SignUpModel } from 'src/models';
import Password from "src/components/password"

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignUp() {
  


  const initValues: SignUpModel = { username: "", password: "",firstName: "", lastName: "" };
  const validation = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const handleSubmit = (values: SignUpModel, helper: FormikHelpers<SignUpModel>) => {
      console.log(values, helper);
  };



  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik    initialValues={initValues}
            validationSchema={validation}
            onSubmit={handleSubmit}>
              {({values, handleChange, handleBlur, errors, handleSubmit}) => (
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
              <Password password={values.password} handleChange={handleChange} handleBlur={handleBlur} error={errors.password} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>)}
          </Formik>

        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}