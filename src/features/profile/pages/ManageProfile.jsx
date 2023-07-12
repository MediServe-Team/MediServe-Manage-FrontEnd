import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminProfile from './AdminProfile';
import CustomerProfile from './CustomerProfile';
import StaffProfile from './StaffProfile';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';
import { getProfileServices } from '../profileServices';

export default function ManageProfile() {
  const [profile, setProfile] = useState({});
  // addBreadcrumb
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: 'Profile',
        slug: '/profile',
      }),
    );
    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch]);

  useEffect(() => {
    const getProfile = async () => {
      const result = await getProfileServices();
      setProfile(result);
    };
    getProfile();
  }, []);

  const role = useSelector((state) => state.auth?.user?.role);
  const renderProfile = (role) => {
    if (role === 'USER')
      return (
        <CustomerProfile
          name={profile.name}
          fullName={profile.fullName}
          gender={profile.gender}
          age={profile.age}
          dateOfBirth={profile.dateOfBirth}
          phoneNumber={profile.phoneNumber}
          avatar={profile.avatar}
          address={profile.address}
        />
      );
    else if (role === 'STAFF') return <StaffProfile />;
    else if (role === 'ADMIN') return <AdminProfile />;
  };
  return <div className="h-full w-full">{renderProfile(role)}</div>;
}
