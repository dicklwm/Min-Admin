/**
 * Created by SUN on 2016/11/24.
 */

import React from 'react';
import Dialog from './dialog';
export default class  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: true, zoom: 1};
    this.zoomImageEvent = function (e) {
      if (this.state.show) {
        this.state.zoom += e.wheelDelta > 0 ? 0.1 : -0.1;
        if (this.state.zoom < 0.1) {
          this.state.zoom = 0.1;
        }
        if (this.state.zoom > 4) {
          this.state.zoom = 4;
        }
        var newWidth = this.state.width * this.state.zoom;
        this.refs['img'].style.width = newWidth + "px";
      }
    }.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousewheel', this.zoomImageEvent, true);
    this.state.width = this.refs['img'].offsetWidth;
  }

  componentWillUnmount() {
    window.removeEventListener('mousewheel', this.zoomImageEvent);
    this.state.show = false;
  }

  componentDidUpdate() {
    this.state.width = this.refs['img'].offsetWidth;
  }

  componentWillReceiveProps() {
    this.state.show = true;
    this.state.zoom = 1;
  }

  render() {
    return (
      <Dialog ref="dialog" className="image" fade={true}
              onClick={()=> {
                this.refs['dialog'].closeDialog();
                this.state.show = false;
              }}>
        <img ref="img" src={this.props.src}/>
      </Dialog>
    );
  }
}