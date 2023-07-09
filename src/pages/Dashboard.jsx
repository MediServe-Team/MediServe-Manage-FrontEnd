import { useEffect } from 'react';
import { getAllCategory } from '../features/category/categorySlice';
import { getAllUnits } from '../slices/unitSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Button from '../components/Button';

function Dashboard() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllUnits());
  }, []);

  return (
    <div className="h-full bg-white rounded-lg flex justify-center items-center">
      <span>This is Dashboard Page.</span>
      <br />
      <Button onClick={() => console.log(state)}>log</Button>
    </div>
  );
}

export default Dashboard;
