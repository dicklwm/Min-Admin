import React from 'react';
import { connect } from 'dva';
import { Button, Table } from 'antd';
import WxFriends from '../../components/UserManage/Wx/WxFriends';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';


const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name==='Disabled User',    // Column configuration not to be checked
  }),
};

class UserList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false,
    }

    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: '操作',
        key: 'operation',
        render: (record, text, index) =>
          <Button onClick={this.handleClick.bind(this)}>聊天记录</Button>

      }];
  }

  handleClick(){
    this.setState({
      open: !this.state.open,
    })
  }



  render () {
    return (
      <div>
        <Table dataSource={dataSource} columns={this.columns} rowSelection={rowSelection}/>
        <MuiThemeProvider>
          <Drawer width={1000} openSecondary={true} open={this.state.open} docked={false}
                  onRequestChange={(open) => this.setState({open})}>
            <WxFriends/>
          </Drawer>
        </MuiThemeProvider>
      </div>
    )
  }
}

function mapStateToProps () {
  return {};
}

export default connect(mapStateToProps)(UserList);
