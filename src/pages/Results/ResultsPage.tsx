import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useEffect } from "react";
import { columns } from "./colums";
import { User } from "./models";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";

const ResultsPage = () => {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const apiPath = "/OnBoardingPre/WebApi/api/user/GetUsers";
  const [users, setUsers] = React.useState<[]>([]);
  const [searchText, setSearchText] = React.useState<string>("");
  const [filter, setFilter] = React.useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const request = await fetch(`${apiUrl}${apiPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Body: { SearchText: "jorge" } }),
      });

      const response = await request.json();
      setUsers(response.Body);
    };

    fetchUsers();
  }, [apiUrl]);

  const getUsers = () => {
    if (users.length < 1) return [];
    if (filter) {
      return users.filter(
        (user: User) =>
          user?.Username?.includes(filter) ||
          user?.Name?.includes(filter) ||
          user?.FatherLastName?.includes(filter) ||
          user?.Email?.includes(filter) ||
          user?.PhoneNumber?.includes(filter) ||
          user?.CreationDate?.includes(filter) ||
          user?.Id?.toString().includes(filter)
      );
    }
    return users;
  };

  return (
    <AuthLayout>
      <Grid container sx={{ height: "80vh" }} justifyContent="center">
        <Grid xs={12} sm={12} md={12} lg={12} sx={{ pt: 5 }}>
          <Stack spacing={3}>
            <Stack spacing={3} sx={{ px: 4, pt: 4 }}>
              <Typography variant="h4">Resultados</Typography>
              <Stack
                sx={{ py: 2 }}
                direction="row"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1}>
                  <TextField
                    label="Buscar"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => setFilter(searchText)}
                  >
                    Ok
                  </Button>
                  {filter && (
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => {
                        setFilter("");
                        setSearchText("");
                      }}
                    >
                      Limpiar fitro
                    </Button>
                  )}
                </Stack>
                <Button
                  variant="contained"
                  onClick={() => navigate("/new-user")}
                >
                  Nuevo usuario
                </Button>
              </Stack>
            </Stack>
            <Box sx={{ height: 550, width: "100%", px: 3 }}>
              <DataGrid
                columns={columns}
                rows={getUsers()}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 8,
                    },
                  },
                }}
                pageSizeOptions={[8]}
                getRowId={(row) => row.Id}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};

export default ResultsPage;
