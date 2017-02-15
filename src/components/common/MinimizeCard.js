import React from 'react';
import styles from './MinimizeCard.css';
import { Card, Button } from 'antd';

class MinimizeCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isMinus: false,
    }
  }

  render () {
    const { title, children, width, bodyOption }=this.props;
    return (
      <Card
        title={title}
        extra={ this.state.isMinus ?
          <Button icon="plus" size="small" onClick={() => {
            this.setState({ isMinus: false })
          }}/> :
          <Button icon="minus" size="small" onClick={() => {
            this.setState({ isMinus: true })
          }}/>
        }
        style={{ width: width }}
        bodyStyle={this.state.isMinus ? { ...bodyOption, display: 'none' } : { ...bodyOption }}
      >
        {children}
      </Card>
    )
  }
}

export default MinimizeCard;
