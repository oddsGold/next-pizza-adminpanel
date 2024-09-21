import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/Authentication/SignIn.tsx';
import SignUp from '../pages/Authentication/SignUp.tsx';

const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/signin" />}/>
    </Routes>
  );
};

export default PublicRoutes;
