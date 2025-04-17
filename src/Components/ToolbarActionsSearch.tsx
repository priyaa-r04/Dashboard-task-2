import { Logout } from "@mui/icons-material";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import { ThemeSwitcher } from "@toolpad/core";
import { useContext, useState } from "react";
import { UserContext } from "./ContextAPI/UserContext";
import { useNavigate } from "react-router-dom";

interface ToolbarActionsSearchProps {
    onNavigate: (page: string) => void;
}

const ToolbarActionsSearch = ({ onNavigate }: ToolbarActionsSearchProps) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    if (!currentUser) return null;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
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
                <Avatar 
                    sx={{ bgcolor: "primary.main" }}
                    src={currentUser?.profileImageUrl || undefined} 
                >
                    {!currentUser?.profileImageUrl || currentUser?.name.charAt(0).toUpperCase()}
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
                            minWidth: 200,
                            padding: '16px',
                            height: 'auto',
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
