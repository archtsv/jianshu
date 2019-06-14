import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListInfo,
  LoadMore
} from '../style';
import { actionCreators } from '../store';

class List extends PureComponent {
  render() {
    const { list, getMoreList, page } = this.props;
    return (
      <Fragment>
        {
          list.map((item, index) => {
            return (
              <Link key={index} to='/detail'>
                <ListItem>
                  <img className='pic' src={item.get('imgUrl')} alt=""/>
                  <ListInfo>
                    <h3 className='title'>{item.get('title')}</h3>
                    <p className='desc'>{item.get('desc')}</p>
                  </ListInfo>
                </ListItem>
              </Link>
            )
          })
        }
        <LoadMore onClick={() => getMoreList(page)}>阅读更多</LoadMore>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.getIn(['home', 'articleList']),
  page: state.getIn(['home', 'articlePage'])
});

const mapDispatchToProps = (dispatch) => ({
  getMoreList(page) {
    dispatch(actionCreators.getMoreListAction(page));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(List);