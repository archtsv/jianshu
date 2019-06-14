import axios from 'axios';
import { INIT_HOME_DATA, ADD_HOME_LIST, TOGGLE_SCROLL_SHOW } from './constants';
import { fromJS } from 'immutable';

const changeHomeDataAction = (data) => ({
  type: INIT_HOME_DATA,
  topicList: data.topicList,
  articleList: data.articleList,
  recommendList: data.recommendList
});

const addHomeList = (data, nextPage) => ({
  type: ADD_HOME_LIST,
  list: fromJS(data),
  nextPage
})

export const initDataAction = () => {
  return (dispatch) => {
    axios.get('/api/home.json')
      .then((res) => {
        const result = res.data.data;
        dispatch(changeHomeDataAction(result));
      })
  }
}

export const getMoreListAction = (page) => {
  return (dispatch) => {
    axios.get('/api/homeList.json?page=' + page)
      .then((res) => {
        const result = res.data.data;
        dispatch(addHomeList(result, page + 1))
      })
  }
}

export const toggleTopShow = (show) => ({
  type: TOGGLE_SCROLL_SHOW,
  show
})
