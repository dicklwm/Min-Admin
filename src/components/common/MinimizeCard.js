import React from 'react';
import styles from './MinimizeCard.css';
import { Card, Button, Tooltip } from 'antd';

class MinimizeCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isMinus: false,
    }

  }

  render () {
    const { title, children, width, bodyOption, loading }=this.props;
    return (
      <Card
        title={title}
        extra={
          <div>
            {this.props.extra}
            {
              this.state.isMinus ?
                <Tooltip title="显示">
                  <Button icon="down" onClick={() => {
                    this.setState({ isMinus: false })
                  }}/>
                </Tooltip> :
                <Tooltip title="隐藏">
                  <Button icon="up" onClick={() => {
                    this.setState({ isMinus: true })
                  }}/>
                </Tooltip>
            }
          </div>
        }
        style={{ width: width }}
        loading={loading}
        bodyStyle={this.state.isMinus ? { ...bodyOption, display: 'none' } : { ...bodyOption }}
      >
        {children}
      </Card>
    )
  }
}

MinimizeCard.propTypes={
  title:React.PropTypes.string,
  children:React.PropTypes.element,
  width:React.PropTypes.number,
  bodyOption:React.PropTypes.object,
  loading:React.PropTypes.bool,
  extra:React.PropTypes.element,
}

export default MinimizeCard;
