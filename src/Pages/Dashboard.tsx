import { useContext, useState } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import { Button, Switch, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Stack, Avatar } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

const Dashboard = () => {
  const { users } = useContext(UserContext)!;
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <AppProvider
      navigation={[
        { segment: "dashboard", title: "Dashboard" },
        { segment: "users", title: "Users" },
      ]}
    >
      <DashboardLayout>
      <Box
          sx={{
            py: 4,
            px: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >

          <Typography variant="h5">Dashboard</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar alt="User Avatar" src="../assets/profile.png" />
            </Stack>
          </Box>

          <Box
            sx={{
              py: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Switch</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    <Switch
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button sx={{ color: "primary.main" }}>View</Button>
                    <Button sx={{ color: "error.main", ml: 2 }}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
};

export default Dashboard;
