import React from 'react';
import { Row, Col, Form, Input, Icon, Checkbox, Button }from 'antd';
import styles from './Login.less';
import config from '../../utils/config';

const FormItem = Form.Item;

class Login extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      verify: config.loginConfig.CaptchaAddress + '?' + (Math.random() * 100000).toFixed(0),
    }
  }

  handleLoginClick = () => {
    const that = this,
      { validateFieldsAndScroll, setFieldsValue }=this.props.form;
    validateFieldsAndScroll((errors, values) => {
      if (errors) return;
      if (config.loginConfig.needCaptcha) {
        setFieldsValue({ 'verify_code': '' });
        that.changeVerify();
      }
      this.props.onOk(values);
    });
  }

  changeVerify = () => {
    this.setState({
      verify: config.loginConfig.CaptchaAddress + '?' + (Math.random() * 100000).toFixed(0),
    })
  }

  handleRegisterClick = () => {
    console.log('Register');
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (

      <div className={styles['login-page']}
           style={{ backgroundImage: 'url(' + config.loginConfig.logoBackground + ')' }}>
        <Row>
          <Col xs={{ span: 20, offset: 2 }}
               sm={{ span: 16, offset: 4 }}
               md={{ span: 12, offset: 6 }}
               lg={{ span: 8, offset: 8 }}>
            <div className={styles["login-box"]}>
              <div className={styles["login-logo"]}>
                <img src={config.logoSrc} alt="logo"/>
                <a href="#">
                  {config.name}
                </a>
              </div>
              <div className={styles['login-box-body']}>
                <p className={styles['login-box-msg']}>登录</p>

                <Form layout="vertical">
                  <FormItem>
                    {getFieldDecorator('user_id', {
                      rules: [{ required: true, message: '请输入账号' }],
                    })(
                      <Input size="large" addonBefore={<Icon type="user"/>} placeholder="账号"/>
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('user_password', {
                      rules: [{ required: true, message: '请输入密码' }],
                    })(
                      <Input size="large" addonBefore={<Icon type="lock"/>} type="password"
                             placeholder="密码"/>
                    )}
                  </FormItem>

                  {
                    config.loginConfig.needCaptcha ?
                      <Row>
                        <Col span={12}>
                          <FormItem>
                            {getFieldDecorator('verify_code', {
                              rules: [{ required: true, message: '请输入验证码' }],
                            })(
                              <Input size="large" type="text"
                                     placeholder="验证码"/>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <img style={{ height: 32 }}
                               src={this.state.verify}
                               alt="验证码"/>
                        </Col>
                        <Col span={4} style={{ lineHeight: '36px' }}>
                          <a onClick={this.changeVerify}>换一张</a>
                        </Col>
                      </Row>

                      : null
                  }

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
                          onClick={this.handleLoginClick}
                          loading={this.props.loading}
                  >
                    登录
                  </Button>
                  {
                    config.loginConfig.needRegister ?
                      <Button type="guest" htmlType="button" className={styles["login-form-button"]}
                              onClick={this.handleRegisterClick}>
                        注册
                      </Button>
                      : null
                  }

                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create()(Login);
