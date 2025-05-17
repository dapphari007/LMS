import { useAuth as useAuthContext } from '../context/AuthContext';

// Re-export the useAuth hook from the AuthContext
export const useAuth = useAuthContext;

export default useAuth;