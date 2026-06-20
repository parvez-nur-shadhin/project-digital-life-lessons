import DashboardHomePage from '@/Component/Dashboard/user/DashboardHomapage';
import { getFavorites } from '@/lib/actions/favorites';
import React from 'react';

const UserPage = async() => {
  const favorites = await getFavorites();
  return (
    <div>
      <DashboardHomePage favorites={favorites} />
    </div>
  );
};

export default UserPage;