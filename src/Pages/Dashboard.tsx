import { Box, Stack } from "@mui/material";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import { createTheme } from "@mui/material/styles";
import { Typography } from "@mui/joy";
import ToolbarActionsSearch from "../Components/ToolbarActionsSearch";
import Tables from '../Components/Tables'

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

const CustomAppTitle = () => {
    return (
        <Stack spacing={1.5}>
            <Typography level="h4">Dashboard</Typography>
        </Stack>
    );
};

const Dashboard = () => {
    return (
        <AppProvider
            navigation={[
                { segment: "dashboard", title: "Dashboard" },
                { segment: "users", title: "Users" },
            ]}
            theme={demoTheme}
        >
            <DashboardLayout
                slots={{
                    appTitle: CustomAppTitle,
                    toolbarActions: ToolbarActionsSearch,
                }}
            >
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
                            py: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        <Tables />
                    </Box>
                </Box>
            </DashboardLayout>
        </AppProvider>
    );
};
export default Dashboard;

