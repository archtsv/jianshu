import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import {
  HeaderWrapper,
  WithLimit,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem
} from './style';

class Header extends Component {

  getListArea() {
    const { focused, mouseIn, list, page, totalPage, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props;
    const newList = list.toJS();
    const pageList = [];

    if (newList.length) {
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        if (newList[i]) {
          pageList.push(<SearchInfoItem key={ newList[i] }>{ newList[i] }</SearchInfoItem>)
        }
      }
    }

    if (focused || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch 
              onClick={() => { handleChangePage(page, totalPage) }}
            >
              <i className="iconfont spin" ref={(icon) => {this.spinIcon = icon}}>&#xe851;</i>
              换一换
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            { pageList }
          </SearchInfoList>
        </SearchInfo>
      );
    } else {
      return null;
    }
  }

  render() {
    const { focused, handleInputFocus, handleInputBlur } = this.props;
    return (
      <HeaderWrapper>
        <WithLimit>
          <Logo />
          <Nav>
            <NavItem className="left active">首页</NavItem>
            <NavItem className="left">下载App</NavItem>
            <NavItem className="right">登录</NavItem>
            <NavItem className="right">
              <i className="iconfont">&#xe636;</i>
            </NavItem>
            <SearchWrapper>
              <CSSTransition
                in={focused}
                timeout={400}
                classNames="slide"
              >
                <NavSearch
                  className={focused ? 'focused': ''}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </CSSTransition>
              <i className={focused ? 'focused iconfont zoom': 'iconfont zoom'}>&#xe62d;</i>
              { this.getListArea() }
            </SearchWrapper>
          </Nav>
          <Addition>
            <Button className="writting">
              <i className="iconfont">&#xe60c;</i>
              写文章
            </Button>
            <Button className="reg">注册</Button>
          </Addition>
        </WithLimit>
      </HeaderWrapper>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    totalPage: state.getIn(['header', 'totalPage']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus() {
      dispatch(actionCreators.getList());
      dispatch(actionCreators.searchFocus());
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter());
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave());
    },
    handleChangePage(page, totalPage) {
      if (page < totalPage) {
        page = page + 1;
      } else {
        page = 1;
      }
      dispatch(actionCreators.changePage(page));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);