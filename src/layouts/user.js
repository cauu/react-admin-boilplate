import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'dva/router';
// import { ContainerQuery } from 'react-container-query';

class UserLayout extends PureComponent {
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
      <div>
        {
          navData.map((item, index) => (
            <Route
              exact={item.exact}
              key={`item.path_${index}`}
              path={item.path}
              component={item.component}
            />
          ))
        }
      </div>
    );
  }
}

export default UserLayout;
