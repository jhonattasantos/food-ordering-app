import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/layout';
import Home  from '@/pages/Home';
import AuthCallback from './pages/AuthCallback';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './auth/ProtectedRoute';
import ManageRestarant from './pages/ManageRestarant';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout showHero><Home /></Layout>} / >
            <Route path="/auth-callback" element={<AuthCallback />} / >
                
            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={<Layout><UserProfile /></Layout>} / >
            </Route>
            
            <Route path="/manage-restaurant" element={<Layout><ManageRestarant /></Layout>} / >

            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;