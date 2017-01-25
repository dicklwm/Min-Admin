import React from 'react';
import { Row, Col, Form, Input, Icon, Checkbox, Button }from 'antd';
import styles from './Login.css';
import config from '../../utils/config';

const FormItem = Form.Item;

function Login ({ form, loading ,onOk}) {
  const { getFieldDecorator, validateFieldsAndScroll } = form;

  function handleLoginClick () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) return;
      onOk(values);
    });
  }

  function handleRegisterClick () {
    console.log('Register');
  }

  return (

    <div className={styles['login-page']}>
      <Row>
        <Col xs={{ span: 20, offset: 2 }}
             sm={{ span: 16, offset: 4 }}
             md={{ span: 12, offset: 6 }}
             lg={{ span: 8, offset: 8 }}>
          <div className={styles["login-box"]}>
            <div className={styles["login-logo"]}>
              <a href="#">
                {config.name}
              </a>
            </div>
            <div className={styles['login-box-body']}>
              <p className={styles['login-box-msg']}>登录</p>

              <Form vertical>
                <FormItem>
                  {getFieldDecorator('account', {
                    rules: [{ required: true, message: '请输入账号' }],
                  })(
                    <Input size="large" addonBefore={<Icon type="user"/>} placeholder="账号"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码' }],
                  })(
                    <Input size="large" addonBefore={<Icon type="lock"/>} type="password"
                           placeholder="密码"/>
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>记住密码</Checkbox>
                  )}

                  <a className={styles['login-form-forgot']}>忘记密码</a>
                </FormItem>


                <Button type="primary" htmlType="submit" className={styles["login-form-button"]}
                        onClick={handleLoginClick}
                        loading={loading}
                >
                  登录
                </Button>
                <Button type="guest" htmlType="button" className={styles["login-form-button"]}
                        onClick={handleRegisterClick}>
                  注册
                </Button>

              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Form.create()(Login);
