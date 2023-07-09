import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminProfile from './AdminProfile';
import CustomerProfile from './CustomerProfile';
import StaffProfile from './StaffProfile';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';

export default function ManageProfile() {
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

  const role = useSelector((state) => state.auth?.user?.role);
  const renderProfile = (role) => {
    if (role === 'USER') return <CustomerProfile />;
    else if (role === 'STAFF') return <StaffProfile />;
    else if (role === 'ADMIN') return <AdminProfile />;
  };
  return <div className="h-full w-full">{renderProfile(role)}</div>;
}
