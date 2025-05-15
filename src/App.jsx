import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import PreferenceJourney from './components/preference/PreferenceJourney';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import Profile from './components/auth/Profile';
import PrivateRoute from './components/auth/PrivateRoute';
import PhoneLogin from './components/auth/PhoneLogin';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: false,
        v7_relativeSplatPath: false,
      }}
    >
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/recipes" element={
          <PrivateRoute>
            <div>食谱推荐页面（开发中）</div>
          </PrivateRoute>
        } />
        <Route path="/favorites" element={
          <PrivateRoute>
            <div>我的收藏页面（开发中）</div>
          </PrivateRoute>
        } />
        <Route path="/settings" element={
          <PrivateRoute>
            <div>个人设置页面（开发中）</div>
          </PrivateRoute>
        } />
        <Route path="/preference" element={
          <PrivateRoute>
            <PreferenceJourney />
          </PrivateRoute>
        } />
        <Route path="/preference/cuisine" element={
          <PrivateRoute>
            <div>美食偏好设置页面（开发中）</div>
          </PrivateRoute>
        } />
        <Route path="/phone-login" element={<PhoneLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 