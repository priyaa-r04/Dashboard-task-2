import { Box, Typography } from "@mui/material";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import { createTheme } from "@mui/material/styles";
import { useContext } from "react";
import { UserContext } from "../Components/ContextAPI/UserContext";
import { useDemoRouter } from "@toolpad/core/internal";
import ToolbarActionsSearch from "../Components/ToolbarActionsSearch";
import Tables from "../Components/Tables/Tables";
import { BarChart } from '../Components/Graphs/BarChart';
import { LineChart } from "../Components/Graphs/LineChart"
import { RadarChart } from "../Components/Graphs/RadarChart";
import { DoughnutChart } from "../Components/Graphs/DoughnutChart";
import ProfilePage from "../Components/ProfilePage";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Tasks from "../Components/Tasks/Tasks";

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
            <Typography variant="h4">WorkSphere</Typography>
        </Box>
    );
};
function DemoPageContent({ pathname, navigate }: { pathname: string; navigate: (segment: string) => void }) {
    return (
        <Box
            sx={{
                py: 4,
                width: "100%",
            }}
        >
            {pathname === "/dashboard" && (
                <div className="grid grid-cols-2 gap-x-7 gap-y-10 p-5">
                    <div className="h-72 w-full p-6 bg-white rounded-lg shadow-md flex justify-center items-center">
                        <BarChart />
                    </div>
                    <div className="h-72 w-full p-6 bg-white rounded-lg shadow-md flex justify-center items-center">
                        <LineChart />
                    </div>
                    <div className="h-72 w-full p-6 bg-white rounded-lg shadow-md flex justify-center items-center">
                        <RadarChart />
                    </div>
                    <div className="h-72 w-full p-6 bg-white rounded-lg shadow-md flex justify-center items-center">
                        <DoughnutChart />
                    </div>
                </div>
            )}
            {pathname === "/users" && (
                <div>
                    <Typography variant="h5" sx={{ ml: 4 }}>Users Data</Typography>
                    <Tables />
                </div>
            )}


{pathname === "/tasks" && (
    <div className="p-6">
        <Tasks />
    </div>
)}

            {pathname === "/profile" && <ProfilePage onClose={() => navigate("dashboard")} />}
        </Box>
    );
}
const Dashboard = () => {
    const { users } = useContext(UserContext);
    const router = useDemoRouter("/dashboard");

    const handleNavigate = (page: string) => {
        router.navigate(page);
    };


    return (
        <AppProvider
            navigation={[
                { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
                { segment: "users", title: "Users", icon: <PeopleIcon /> },
                { segment: "tasks", title: "Tasks", icon: <AssignmentIcon /> },
            ]}
            router={router}
            theme={demoTheme}
        >
            <DashboardLayout
                slots={{
                    appTitle: CustomAppTitle,
                    toolbarActions: () => <ToolbarActionsSearch onNavigate={handleNavigate} />
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <DemoPageContent pathname={router.pathname} navigate={handleNavigate} />
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