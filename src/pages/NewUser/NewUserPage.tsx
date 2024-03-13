import { LoadingButton } from "@mui/lab";
import { Alert, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FormikProvider, Form, useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
import AuthLayout from "../../components/AuthLayout";

const NewUserPage = () => {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const apiPath = "/OnBoardingPre/WebApi/api/user/RegisterUserRole";
  const [formError, setFormError] = React.useState<string>("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Username: "",
      Password: "",
      RepeatPassword: "",
      Name: "",
      FatherLastName: "",
      MotherLastName: "",
      Email: "",
      PhoneNumber: "",
    },
    validationSchema: object({
      Username: string().required("Requerido"),
      Password: string().required("Requerido"),
      RepeatPassword: string()
        .required("Requerido")
        .oneOf([ref("Password")], "Las contraseñas no coinciden"),
      Name: string().required("Requerido"),
      FatherLastName: string().required("Requerido"),
      MotherLastName: string().required("Requerido"),
      Email: string().required("Requerido"),
      PhoneNumber: string().required("Requerido"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const parsedValues = {
        Body: {
          UserName: values.Username,
          Password: values.Password,
          Name: values.Name,
          FatherLastName: values.FatherLastName,
          MotherLastName: values.MotherLastName,
          Email: values.Email,
          PhoneNumber: values.PhoneNumber,
          Tenant: null,
          Metadata: null,
          Roles: [{ Id: 2, Name: "Usuario Tradicional" }],
        },
      };

      try {
        const token = localStorage.getItem("token");
        const request = await fetch(`${apiUrl}${apiPath}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(parsedValues),
        });

        const response = await request.json();
        if (response?.IsOK) {
          setFormError("");
          navigate("/results");
        } else {
          setFormError(response?.Messages || "Error");
        }
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
        setFormError(error as string);
      }
    },
  });

  const { getFieldProps, errors, touched, isSubmitting } = formik;

  return (
    <AuthLayout enableBack>
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
                  Nuevo usuario
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    label="Nombre"
                    {...getFieldProps("Name")}
                    error={Boolean(touched.Name && errors.Name)}
                    helperText={touched.Name && errors.Name}
                  />
                  <TextField
                    label="Apellido P"
                    {...getFieldProps("FatherLastName")}
                    error={Boolean(
                      touched.FatherLastName && errors.FatherLastName
                    )}
                    helperText={touched.FatherLastName && errors.FatherLastName}
                  />
                  <TextField
                    label="Apellido M"
                    {...getFieldProps("MotherLastName")}
                    error={Boolean(
                      touched.MotherLastName && errors.MotherLastName
                    )}
                    helperText={touched.MotherLastName && errors.MotherLastName}
                  />
                  <TextField
                    label="Email"
                    {...getFieldProps("Email")}
                    error={Boolean(touched.Email && errors.Email)}
                    helperText={touched.Email && errors.Email}
                  />
                  <TextField
                    label="Telefono"
                    {...getFieldProps("PhoneNumber")}
                    error={Boolean(touched.PhoneNumber && errors.PhoneNumber)}
                    helperText={touched.PhoneNumber && errors.PhoneNumber}
                  />
                  <TextField
                    label="Usuario"
                    {...getFieldProps("Username")}
                    error={Boolean(touched.Username && errors.Username)}
                    helperText={touched.Username && errors.Username}
                  />
                  <TextField
                    label="Password"
                    {...getFieldProps("Password")}
                    error={Boolean(touched.Password && errors.Password)}
                    helperText={touched.Password && errors.Password}
                    type="password"
                  />
                  <TextField
                    label="Repetir Password"
                    type="password"
                    {...getFieldProps("RepeatPassword")}
                    error={Boolean(
                      touched.RepeatPassword && errors.RepeatPassword
                    )}
                    helperText={touched.RepeatPassword && errors.RepeatPassword}
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
                    Guardar
                  </LoadingButton>
                </Stack>
              </Stack>
            </Form>
          </FormikProvider>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};

export default NewUserPage;
