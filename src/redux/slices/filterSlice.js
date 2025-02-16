import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  onlyFavorite: false,
};

const filterSlice = createSlice({
  /* в этом объекте (аргументе createSlice() ) описываем всё что касается reducer-а для фильтров */
  initialState,
  name: 'filter', // технически имя не обязательно должно совпадать с именем при создании магазина с помощью configureStore() - но для ясности - пусть совпадает

  // значение свойства reducers - это объект в который добавляются функции, являющиеся reucer-ами для reducer-а 'filter'.
  //  Имена свойств, содержащих эти функции - это названия соответствующих action-creators
  reducers: {
    setTitleFilter: function (state, action) {
      //   // "Old-school" way - возвращаем новый объект состояния
      //   return {
      //     ...state,
      //     title: action.payload,
      //   };

      // "New-school" way - мутируем объект состояния - возможно благодаря immer
      state.title = action.payload; // возможно благодаря immer
    },

    setAuthorFilter: function (state, action) {
      state.author = action.payload; // возможно благодаря immer
    },

    toggleOnlyFavorite: function (state) {
      state.onlyFavorite = !state.onlyFavorite; // возможно благодаря immer
    },

    resetFilters: function (state, action) {
      return initialState;
    },
  },
});

// slice_Name.actions содержит объект с функциями action-creators (которые создают объекты со св-вами type  и payload) для типов Действий, которые обрабатываются в определённом slice-reducer-е
// action-creators создаются автоматически на основании reducer-а
// console.log(filterSlice.actions);

// экспортируем функции action-creators
export const {
  setTitleFilter,
  setAuthorFilter,
  toggleOnlyFavorite,
  resetFilters,
} = filterSlice.actions;

// callback для useSelector() - общепринятый подход - всё описываем в одном файле, название этой функции начинается с select
export function selectTitleFilter(state) {
  return state.filter.title;
  /* filter - это имя свойства при создании магазина Redux - т.е. часть Состояния
               const store = configureStore({
                  reducer: {
                    books: booksReducer,
                    filter: filterReducer,
                    ..
                  },
                });
               */
}

// callback для useSelector()
export function selectAuthorFilter(state) {
  return state.filter.author;
}

// callback для useSelector()
export function selectOnlyFavorite(state) {
  return state.filter.onlyFavorite;
}

// весь reducer для определённого слайса - slice - находится в свойстве .reducer объекта filterSlice
export default filterSlice.reducer;
