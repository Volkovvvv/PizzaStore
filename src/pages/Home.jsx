import React from 'react';

import qs from 'qs';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  selectFilter,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categoryId, currentPage, sortType, searchValue } = useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onClickSort = (obj) => {
    dispatch(setSortType(obj));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
      const sortBy = sortType.sortProperty.replace('-', '');
      const search = searchValue ? `&search=${searchValue}` : '';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const page = `&page=${currentPage}`;
      dispatch(
        fetchPizzas({
          order,
          sortBy,
          search,
          category,
          page,
        }),
      );
      window.scrollTo(0, 0);
    };

    fetchData();
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj) => (
    <Link key={obj.id} to={`pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
  ));
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sortType} onClickSort={onClickSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status == 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status == 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
