// import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// // Define the state type
// interface AppState {
//   user: any | null;
//   loading: boolean;
//   theme: 'light' | 'dark';
// }

// // Define action types
// type AppAction = 
//   | { type: 'SET_USER'; payload: any }
//   | { type: 'SET_LOADING'; payload: boolean }
//   | { type: 'SET_THEME'; payload: 'light' | 'dark' };

// // Initial state
// const initialState: AppState = {
//   user: null,
//   loading: false,
//   theme: 'light',
// };

// // Create context
// const AppContext = createContext<{
//   state: AppState;
//   dispatch: React.Dispatch<AppAction>;
// } | undefined>(undefined);

// // Reducer function
// const appReducer = (state: AppState, action: AppAction): AppState => {
//   switch (action.type) {
//     case 'SET_USER':
//       return { ...state, user: action.payload };
//     case 'SET_LOADING':
//       return { ...state, loading: action.payload };
//     case 'SET_THEME':
//       return { ...state, theme: action.payload };
//     default:
//       return state;
//   }
// };

// // Provider component
// interface AppProviderProps {
//   children: ReactNode;
// }

// export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
//   const [state, dispatch] = useReducer(appReducer, initialState);

//   return (
//     <AppContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error('useAppContext must be used within an AppProvider');
//   }
//   return context;
// };


// import React, { createContext, ReactNode } from 'react';
// import { useAuthLogic } from '../hooks/useAuth';

// interface AuthContextType {
//   user: any;
//   loading: boolean;
//   login: (phone: string, code: string, userData?: any) => Promise<{ success: boolean; user?: any; error?: string }>;
//   logout: () => void;
//   sendOTP: (phone: string) => Promise<{ success: boolean; data?: any; error?: string }>;
//   isAuthenticated: boolean;
// }

// export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const auth = useAuthLogic();

//   return (
//     <AuthContext.Provider value={auth}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, ReactNode } from 'react';
import { useAuthLogic } from '../hooks/useAuth';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (phone: string, code: string, userData?: any) => Promise<{ success: boolean; user?: any; error?: string }>;
  logout: () => void;
  sendOTP: (phone: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  isAuthenticated: boolean;
}

// Create context with undefined initially
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuthLogic();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
