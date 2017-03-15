/**
 * Created by Sun on 16/10/3.
 */

import React from 'react';
import './dialog.less';
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show !== false,
      view: this.props.children,
      title: this.props.title,
      closeTimeoutId: 0,
      showTimeoutId: 0,
    };
    this.className = "content";
    this.unmount = false;
    this.fade = ( this.props.fade ? " fade " : " ");
    this.transparent = (!!this.props.transparent) ? " tran" : "";
    if (this.props.className) {
      this.className += " " + this.props.className;
    }
    this.showDialogEvent = function () {
      if (this.refs['dialog']) {
        this.refs['dialog'].className = "sun-dialog show" + this.fade + (this.props.rootClass || "") + this.transparent;
      }
      this.state.showTimeoutId = 0;

    }.bind(this);
  }

  componentDidMount() {
    if (this.state.showTimeoutId == 0 && this.state.show) {
      this.state.showTimeoutId = window.setTimeout(this.showDialogEvent, 20);
    }
  }

  closeDialog(callback) {
    if (this.refs['dialog']) {
      this.refs['dialog'].className = "sun-dialog " + (this.props.rootClass || "") + this.fade + this.transparent;
      this.state.show = false;
      window.clearTimeout(this.state.showTimeoutId);
      if (this.state.closeTimeoutId == 0) {
        this.state.closeTimeoutId = window.setTimeout(function () {
          if (!this.unmount) {
            this.forceUpdate(callback);
          }
          this.state.closeTimeoutId = 0;
          this.state.showTimeoutId = 0;
        }.bind(this), 200);
      }
    } else {
      if (callback) {
        callback()
      }
    }
  }

  showDialog() {
    this.setState({show: true});
  }

  componentWillUnmount() {
    this.unmount = true;
  }

  componentDidUpdate() {
    if (this.refs['dialog'] && this.state.showTimeoutId == 0 && this.state.show) {
      window.clearTimeout(this.state.closeTimeoutId);
      this.state.showTimeoutId = window.setTimeout(this.showDialogEvent, 20);
    }
  }

  componentWillReceiveProps(props) {
    if (props.show === false) {
      this.closeDialog();
    } else {
      this.setState({show: true, view: props.children});
    }
  }

  getRoot() {
    return this.refs['root'];
  }

  render() {
    if (this.state.show) {
      return (
        <div ref="dialog" className={"sun-dialog" + this.fade + (this.props.rootClass || "")}
             onClick={this.props.onClick}>
          <div ref="root" className={this.className || "content"}>
            {this.state.title ?
              <div className="dialog-title">
                <div>{this.state.title}</div>
                <div className="dialog-close" onClick={() => {
                  this.closeDialog()
                }}/>
              </div> : null}
            {this.state.view}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
