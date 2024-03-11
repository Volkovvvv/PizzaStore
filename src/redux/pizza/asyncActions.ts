import axios from 'axios';
import { PizzaItem } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { order, sortBy, search, category, page } = params;
    const { data } = await axios.get(
      `https://65a67fdb74cf4207b4f036bc.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}${page}&limit=4`,
    );
    return data;
  },
);
