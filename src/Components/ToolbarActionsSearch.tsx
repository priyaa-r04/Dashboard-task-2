import { Logout, Settings } from "@mui/icons-material";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import { ThemeSwitcher } from "@toolpad/core";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import { useNavigate } from "react-router-dom";

interface ToolbarActionsSearchProps {
    onNavigate: (page: string) => void;
}

const ToolbarActionsSearch = ({ onNavigate }: ToolbarActionsSearchProps) => {
    const { currentUser, setCurrentUser, users, setUsers } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const userInitial = currentUser?.name.charAt(0).toUpperCase();

    const navigate = useNavigate();


    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
        const updatedUsers = users.filter((user) => user.email !== currentUser?.email);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        navigate("/login");
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        onNavigate("profile");
        handleClose();
    };

    useEffect(() => {

    }, [currentUser]);


    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Tooltip title="Search" enterDelay={1000}>
                <div>
                    <IconButton
                        type="button"
                        aria-label="search"
                        sx={{
                            display: { xs: "inline", md: "none" },
                        }}
                    >
                    </IconButton>
                </div>
            </Tooltip>
            <ThemeSwitcher />
            <IconButton onClick={handleClick}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                    {userInitial}
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleProfileClick}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Stack>

    );
};

export default ToolbarActionsSearch;