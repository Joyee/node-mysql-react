import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import { Table, Form, Pagination, Input, Button, Modal, Row, message } from 'antd'
import 'antd/dist/antd.css'
import config from './config'

const { Search } = Input
const FormItem = Form.Item
const { confirm } = Modal


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      modalType: 'add',
      total: 1,
      current: 1,
      size: 10,
      dataSource: [],
      search: '',
      editRow: null,
    }

    this.columns = [
      {
        dataIndex: 'username',
        title: '用户',
        key: 'name'
      },
      {
        dataIndex: 'age',
        title: '年龄',
        key: 'age'
      },
      {
        dataIndex: 'address',
        title: '地址',
        key: 'address'
      },
      {
        dataIndex: 'action',
        title: '操作',
        width: 200,
        render: (text, row) => {
          return <div>
            <Button onClick={this.bindModal.bind(this, 'edit', row)}>编辑</Button>
            <Button style={{marginLeft: 10}} type='danger' onClick={this.bindDelete.bind(this, row)}>删除</Button>
          </div>
        }
      }
    ]
  }


  componentDidMount() {
    this.changeSize(this.state.current, this.state.size)
  }

  /*
  * 添加/编辑用户
  * */
  bindModal = (type, row) => {
    this.setState({
      visible: true,
      modalType: type
    }, () => {
      this.props.form.resetFields()
      if (type === 'add') return

      this.props.form.setFieldsValue({
        username: row.username,
        age: row.age,
        address: row.address
      })
      this.setState({
        editRow: row
      })
    })
  }

  // 删除用户
  bindDelete = (row) => {
    console.log(row)
    const that = this
    confirm({
      title: '是否要删除该用户?',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        axios.delete(config.BASE_API + '/user/' + row.id).then(result => {
          if (result.status === 200 && result.data.Code === 0) {
            that.changeSize(that.state.current, that.state.size)
            message.success('删除成功')
          }
        })
      },
      onCancel() {

      }
    })
  }

  // 确定添加用户
  handleOk = () => {
    this.props.form.validateFieldsAndScroll((errors, value) => {
      if (errors) return
      let data = {
        username: value.username,
        age: parseInt(value.age),
        address: value.address
      }
      if (this.state.modalType === 'add') {
        axios.post(config.BASE_API + '/user', data).then(result => {
          this.changeSize(this.state.current, this.state.size)
          this.setState({visible: false})
          message.success('添加成功')
        })
      } else {
        axios.put(config.BASE_API + '/user/' + this.state.editRow.id, data).then(result => {
          this.changeSize(this.state.current, this.state.size)
          this.setState({visible: false})
          message.success('修改成功')
        })
      }
    })
  }

  // 获取用户列表
  changeSize = (current, size) => {
    let data = {
      search: this.state.search,
      limit: size,
      offset: (parseInt(current) - 1) * size
    }
    axios.post( config.BASE_API + '/user-search', data).then(result => {
      if (result.status === 200) {
        let data = result.data
        this.setState({
          dataSource: data.rows,
          total: data.count,
          current,
          size
        })
      }
    })
  }

  // 查找
  bindSearch = (value) => {
    console.log(value)
    this.setState({
      search: value
    }, () => {
      this.changeSize(1, 10)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { visible, modalType, total, current, size, dataSource } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    return (
      <div className='container'>
        <Row>
          <Search
            placeholder='请输入用户名'
            onSearch={this.bindSearch}
            style={{width: 300, marginRight: 30}} />
          <Button type='primary' onClick={this.bindModal.bind(this, 'add', '')}>添加用户</Button>
        </Row>
        <Row>
          <Table dataSource={dataSource} rowKey={record => record.id} columns={this.columns} bordered={true} pagination={false}></Table>
        </Row>
        <Row>
          <Pagination showTotal={(total) => `共${total}条`} total={total} current={current} pageSize={size} onChange={this.changeSize} />
        </Row>
        <Modal
          title={modalType === 'add' ? '添加用户' : '编辑用户'}
          visible={visible}
          onOk={this.handleOk}
          onCancel={() => this.setState({ visible: false })}
        >
          <Form>
            <FormItem label='用户' {...formItemLayout}>
              {
                getFieldDecorator('username', {
                  rules: [{
                    required: true,
                    message: '请输入用户名'
                  }]
                })(<Input placeholder='username'/>)
              }
            </FormItem>
            <FormItem label='年龄' {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  rules: [{
                    required: true,
                    message: '请输入年龄'
                  }]
                })(<Input placeholder='age'/>)
              }
            </FormItem>
            <FormItem label='地址' {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  rules: [{
                    required: true,
                    message: '请输入地址'
                  }]
                })(<Input placeholder='address'/>)
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(App)
