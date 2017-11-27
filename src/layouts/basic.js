import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  }
};

class BasicLayout extends PureComponent {
  static propTypes = {
    app: PropTypes.object,
    match: PropTypes.object,
    navData: PropTypes.array,
    getRouteData: PropTypes.func,
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidCatch() {
  }

  render() {
    const { navData } = this.props;

    return (
      <ContainerQuery query={query}>
        {
          params =>
            (<div className={classNames(params)}>
              {
                navData.map((item, index) => (
                  <Route
                    exact={item.exact}
                    key={`item.path_${index}`}
                    path={item.path}
                    component={item.component} />
                ))
              }
            </div>)
        }
      </ContainerQuery>
    );
  }
}

export default BasicLayout;
