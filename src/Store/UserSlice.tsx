import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  phone: string;
  profileImageUrl?: string;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.email !== action.payload);
    },
    updatePhone(state, action: PayloadAction<{ email: string; phone: string }>) {
      const userIndex = state.users.findIndex(user => user.email === action.payload.email);
      if (userIndex !== -1) {
        state.users[userIndex].phone = action.payload.phone;
      }
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.email === action.payload.email);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const { setUsers, addUser, updatePhone, deleteUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
