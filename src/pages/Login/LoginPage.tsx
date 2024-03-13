import { LoadingButton } from "@mui/lab";
import { Alert, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FormikProvider, useFormik, Form } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

const LoginPage = () => {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const apiPath = "/OnBoardingPre/WebApi/api/authentication/authentication";
  const [formError, setFormError] = React.useState<string>("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: object({
      username: string().required("Requerido"),
      password: string().required("Requerido"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setFormError("");
      try {
        const request = await fetch(`${apiUrl}${apiPath}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Body: {
              Username: values.username,
              Password: values.password,
            },
          }),
        });

        const response = await request.json();

        if (response?.Body) {
          localStorage.setItem("token", response.Body.Token);
          navigate("/results");
        } else {
          setFormError(response?.Messages || "Error");
        }

        setSubmitting(false);
      } catch (error) {
        setFormError(error as string);
        setSubmitting(false);
      }
    },
  });

  const { getFieldProps, errors, touched, isSubmitting } = formik;

  return (
    <Grid
      container
      sx={{ height: "100vh" }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        xs={12}
        sm={12}
        md={4}
        lg={4}
        sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}
      >
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off">
            <Stack spacing={1} sx={{ p: 2 }}>
              <Typography variant="h4" sx={{ textAlign: "center" }}>
                Inicio de Sesión
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Usuario"
                  {...getFieldProps("username")}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  label="Password"
                  {...getFieldProps("password")}
                  type="password"
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Stack>
              {formError && (
                <Alert severity="error" onClose={() => setFormError("")}>
                  {formError}
                </Alert>
              )}
              <Stack direction="row" justifyContent="center">
                <LoadingButton
                  variant="contained"
                  type="submit"
                  sx={{ width: "fit-content" }}
                  loading={isSubmitting}
                >
                  Ok
                </LoadingButton>
              </Stack>
            </Stack>
          </Form>
        </FormikProvider>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
