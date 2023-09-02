import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: 'editor' | 'viewer';
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

// Initialize from local storage or default state
const initialState: UserState = JSON.parse(localStorage.getItem('auth') || 'null') || {
  user: null,
  isAuthenticated: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
      const { username, password } = action.payload;

      if (username === 'SampleEditor' && password === 'EditorPass$1') {
        state.isAuthenticated = true;
        state.user = {
          name: 'Sample Editor',
          email: 'sample.editor@example.com',
          phoneNumber: '123-456-7890',
          address: '123 Editor St, City, Country',
          role: 'editor'
        };
        state.error = null;

      } else if (username === 'SampleViewer' && password === 'ViewerPass$1') {
        state.isAuthenticated = true;
        state.user = {
          name: 'Sample Viewer',
          email: 'sample.viewer@example.com',
          phoneNumber: '987-654-3210',
          address: '456 Viewer Ave, City, Country',
          role: 'viewer'
        };
        state.error = null;

      } else {
        state.error = 'Incorrect username or password.';
      }

      // Update local storage
      localStorage.setItem('auth', JSON.stringify(state));
    },
    
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;

      // Clear local storage
      localStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const selectError = (state: { user: UserState }) => state.user.error;

export default userSlice.reducer;
