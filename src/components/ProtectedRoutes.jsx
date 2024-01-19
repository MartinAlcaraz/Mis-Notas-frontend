import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ user }) => {

    if (user.isLogged == false) {
        return <Navigate to='/' />
    } else {
        return <Outlet />
    }
}

export default ProtectedRoutes;