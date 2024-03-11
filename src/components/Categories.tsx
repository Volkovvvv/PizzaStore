import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';
import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
  getCategories: (categories: string[]) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
