import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminProfile from './AdminProfile';
import CustomerProfile from './CustomerProfile';
import StaffProfile from './StaffProfile';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';
import { getProfile } from '../profileSlice';

export default function ManageProfile() {
  const token = useSelector((state) => state.auth?.accessToken);
  // addBreadcrumb
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: 'Thông tin cá nhân',
        slug: '/profile',
      }),
    );
    dispatch(getProfile(token));
    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch, token]);

  const role = useSelector((state) => state.auth?.user?.role);
  const renderProfile = (role) => {
    if (role === 'USER') return <CustomerProfile />;
    else if (role === 'STAFF') return <StaffProfile />;
    else if (role === 'ADMIN') return <AdminProfile />;
  };
  return <div className="h-full w-full">{renderProfile(role)}</div>;
}
