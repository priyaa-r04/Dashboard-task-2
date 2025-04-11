import { useContext, useState } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";

const ProfilePage = () => {
    const { currentUser } = useContext(UserContext);
    const [password, setPassword] = useState(""); 

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", marginRight: 2 }}>
                    {currentUser?.name.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                    <Typography variant="h6">{currentUser?.name}</Typography>
                    <Typography variant="body1">{currentUser?.email}</Typography>
                </div>
            </Box>

            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />

            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Close
            </Button>
        </Box>
    );
};

export default ProfilePage;
