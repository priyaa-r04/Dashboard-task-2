import { Box, Typography } from "@mui/material";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import { createTheme } from "@mui/material/styles";
import { useContext } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import { useDemoRouter } from "@toolpad/core/internal";
import ToolbarActionsSearch from "../Components/ToolbarActionsSearch";
import Tables from "../Components/Tables";
import { BarChart } from '../Components/BarChart';

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
        <Box>
            <Typography variant="h4">Dashboard</Typography>
        </Box>
    );
};
function DemoPageContent({ pathname }: { pathname: string }) {
    return (
        <Box
            sx={{
                py: 4,
                width: "100%",
            }}
        >
            {pathname === "/dashboard" && (
                <div className="p-3">
                <BarChart />
                </div>
            )}
            {pathname === "/users" && (
                <div>
                    <Typography variant="h5"  sx={{ ml:4}}>Users Data</Typography>
                    <Tables />
                </div>
            )}
        </Box>
    );
}
const Dashboard = () => {
    const { users } = useContext(UserContext);
    const router = useDemoRouter("/dashboard");

    return (
        <AppProvider
            navigation={[
                { segment: "dashboard", title: "Dashboard" },
                { segment: "users", title: "Users" },
            ]}
            router={router}
            theme={demoTheme}
        >
            <DashboardLayout
                slots={{
                    appTitle: CustomAppTitle,
                    toolbarActions: ToolbarActionsSearch,
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <DemoPageContent pathname={router.pathname} />
                    {router.pathname === "/users" && (
                        <Box sx={{ p: 2, mt: "auto" }}>
                            <Typography variant="h6" textAlign="center">
                                Total Users: {users?.length || 0}
                            </Typography>
                        </Box>
                    )}
                </Box>

            </DashboardLayout>
        </AppProvider>
    );
};
export default Dashboard;