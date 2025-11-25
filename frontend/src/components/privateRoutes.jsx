import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    const token = localStorage.getItem('@menufacile:token');
    return token ? <Outlet /> : <Navigate to="/login" />;
}