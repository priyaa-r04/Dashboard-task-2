import { useState, useContext } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Switch,
    Button,
} from "@mui/material";
import { UserContext } from "../ContextAPI/UserContext";

const Tables = () => {
    const { users } = useContext(UserContext)!;
    const [checked, setChecked] = useState<boolean>(false);

    return (
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
    );
};


export default Tables;