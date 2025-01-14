import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../store/slices/exampleSlice';

const Counter = () => {
  const value = useSelector((state) => state.example.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {value}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
    </div>
  );
};

export default Counter;
