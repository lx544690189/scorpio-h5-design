import { useState } from 'react';
import { createContainer } from 'unstated-next';



export default createContainer(function useCounter() {
  const [count, setCount] = useState(0);
  const decrement = () => setCount(count - 1);
  const increment = () => setCount(count + 1);
  return { count, decrement, increment };
});