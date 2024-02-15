import React from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setSortType } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

export const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sortType);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [categoryId, setCategoryId] = React.useState(0);

  // const [sortType, setSortType] = React.useState({
  //   name: 'популярности',
  //   sortProperty: 'rating',
  // });
  const [pageNumber, setPageNumber] = React.useState(1);
  const { searchValue } = React.useContext(SearchContext);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onClickSort = (obj) => {
    dispatch(setSortType(obj));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const page = `&page=${pageNumber}`;

    // fetch(
    //   `https://65a67fdb74cf4207b4f036bc.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}${page}&limit=4`,
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setItems(json);
    //     setIsLoading(false);
    //   });
    axios
      .get(
        `https://65a67fdb74cf4207b4f036bc.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}${page}&limit=4`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, pageNumber]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sortType} onClickSort={onClickSort} />
      </div>
      <p className="hello" id="555" price="222"></p>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
    </div>
  );
};

export default Home;
