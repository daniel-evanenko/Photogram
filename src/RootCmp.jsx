import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage.tsx';
import { LoginSignup } from './pages/LoginSignup.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';

export function RootCmp() {
    return (
        <div className="main-container">
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/story/:storyId" element={<HomePage />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            </main>
        </div>
    );
}