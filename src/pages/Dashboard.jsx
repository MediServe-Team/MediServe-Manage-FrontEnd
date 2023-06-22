import { useEffect } from 'react';
import { getAllCategory } from '../features/category/categorySlice';
import { getAllUnits } from '../slices/unitSlice';
import { useDispatch } from 'react-redux';

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllUnits());
  }, []);

  return (
    <div className="h-full bg-white rounded-lg flex justify-center items-center">
      <span>This is Dashboard Page.</span>
    </div>
  );
}

export default Dashboard;
