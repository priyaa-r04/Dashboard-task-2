import { useState, useContext } from "react";
import { UserContext } from "./ContextAPI/UserContext";
import { Box, Button, TextField, Typography, Avatar, Snackbar } from "@mui/material";

interface ProfilePageProps {
  onClose: () => void;  
}

const ProfilePage = ({ onClose }: ProfilePageProps) => {
  const { currentUser, setCurrentUser, users, setUsers } = useContext(UserContext);

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handlePasswordChange = () => {
    if (currentPassword && newPassword) {
      if (currentPassword === currentUser?.password) {
        const updatedUser = { ...currentUser!, password: newPassword };
        setCurrentUser(updatedUser);
        const updatedUsers = users.map((user) =>
          user.email === currentUser?.email ? updatedUser : user
        );
        setUsers(updatedUsers);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        setSnackbarOpen(true);
      } else {
        alert("Current password is incorrect.");
      }
    } else {
      alert("Please enter both current and new password.");
    }
  };

  if (!currentUser) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 6, height: "100vh"}}>
        <Typography variant="h4" gutterBottom>
          No user data found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", mt: 0 }}>
  <Box sx={{ width: "100%", maxWidth: "800px", p: 6, backgroundColor: "white", boxShadow: 3, borderRadius: 2 }}>
    <Typography variant="h5" gutterBottom textAlign="center">Profile</Typography>

    <Box sx={{ backgroundColor: "#fff", p: 3, borderRadius: 2, boxShadow: 1, mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 2, width: 80, height: 80 }}>
          {currentUser?.name.charAt(0).toUpperCase()}
        </Avatar>
        <div>
          <Typography variant="h6">{currentUser?.name}</Typography>
          <Typography variant="body1">{currentUser?.email}</Typography>
          <Typography variant="body1"><strong>Password:</strong> ********</Typography>
        </div>
      </Box>
    </Box>

        {isEditing && (
          <>
            <Box sx={{ mb: 4 }}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>Change Password</Typography>
              <TextField
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePasswordChange}
                sx={{ mt: 2 }}
              >
                Update Password
              </Button>
            </Box>
          </>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsEditing((prev) => !prev)}
            sx={{ width: "48%" }}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose} 
            sx={{ width: "48%" }}
          >
            Close
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Password updated successfully"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
};

export default ProfilePage;

