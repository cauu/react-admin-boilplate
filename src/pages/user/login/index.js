import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

import './login.scss';

@Form.create()
class Login extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="iqc-login">
        <Form>
          <Form.Item
            label="用户名">
            <Input />
          </Form.Item>
          <Form.Item
            label="密码">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;