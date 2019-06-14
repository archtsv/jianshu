import { fromJS } from 'immutable';
import { INIT_HOME_DATA, ADD_HOME_LIST, TOGGLE_SCROLL_SHOW } from './constants';

const defaultState = fromJS({
  topicList: [],
  articleList: [],
  recommendList: [],
  articlePage: 1,
  showScroll: false,
});

const initHomeData = (state, action) => {
  return state.merge({
    topicList: fromJS(action.topicList),
    articleList: fromJS(action.articleList),
    recommendList: fromJS(action.recommendList)
  });
}

const addHomeList = (state, action) => {
  return state.merge({
    articleList: state.get('articleList').concat(action.list),
    articlePage: action.nextPage
  });
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case INIT_HOME_DATA:
      return initHomeData(state, action);
    case ADD_HOME_LIST:
      return addHomeList(state, action);
    case TOGGLE_SCROLL_SHOW:
      return state.set('showScroll', action.show);
    default:
      return state;
  }
}
