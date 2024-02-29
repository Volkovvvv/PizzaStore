import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://65a67fdb74cf4207b4f036bc.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пицц');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <div>Loading</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} Р</h4>
    </div>
  );
};

export default FullPizza;
