import axios from 'axios';
import * as constants from './constans';

const changeDetail = (data) => ({
  type: constants.CHANGE_DETAIL,
  title: data.title,
  content: data.content,
})

export const getDetail = (id) => {
  return (dispatch) => {
    axios.get(`/api/detail.json?id=${id}`)
      .then((res) => {
        dispatch(changeDetail(res.data.data));
      })
  }
}