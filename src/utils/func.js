import EditableCell from '../components/common/EditableCell';

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, function () {
    return arguments[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length===1
        ? o[k]
        : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

function makeColumn (title, dataIndex, editable, dataType = 'string', width = 150, fixed = false, sorter = true, Edit = true, onChange) {
  return {
    title: title,
    dataIndex: dataIndex,
    key: dataIndex,
    width: width,
    fixed: fixed,
    sorter: sorter===false ? null :
      dataType==='number' ?
        (a, b) => a[dataIndex] - b[dataIndex] :
        dataType==='string' ?
          (a, b) => a[dataIndex].charCodeAt(0) - b[dataIndex].charCodeAt(0) :
          dataType==='date' || 'datetime' ?
            (a, b) => new Date(a[dataIndex]) - new Date(b[dataIndex]) :
            null,
    render: Edit ? (text, record, index) => (
        <EditableCell
          editable={editable[dataIndex]}
          dataType={dataType}
          value={text}
          dataIndex={dataIndex}
          onChange={onChange}
        />
      ) : null
  }
}

function makeColumns (array = [], onChange) {
  let allColumns = [];
  array.forEach(column => {
    allColumns.push(
      makeColumn(column[0], column[1], column[2], column[3], column[4], column[5], column[6], onChange)
    )
  })
  return allColumns;
}

module.exports = {
  makeColumn,
  makeColumns
}
