import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminDashboard from '@/components/admin/AdminDashboard';

const AdminPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | QuizSync</title>
        <meta name="description" content="Host and control your QuizSync game session. Manage rounds, push questions, and monitor live player scores." />
      </Helmet>
      <AdminDashboard />
    </>
  );
};

export default AdminPage;
