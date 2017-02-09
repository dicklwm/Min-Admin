import React from 'react';
import { Button, Icon } from 'antd';
import request from '../../utils/request';

function UploadFile ({}) {
  return (
    <form
      style={{ display: 'inline-block' }}
      method="post"
    >
      <input type="file" name="file" style={{ display: 'none' }} onChange={e => {
        let files = e.target.files;
        if (!!files.length) {
          let data = new FormData();
          data.append('file', files[0]);
          console.log(data);
          request('/fileUpload', {
            method: 'POST',
            body: data
          })
        }
      }}/>
      <Button type="ghost" onClick={e => {
        let fileInput = e.target.parentElement.getElementsByTagName('input')[0] || e.target.parentElement.parentElement.getElementsByTagName('input')[0];
        fileInput.click();
      }}>
        <Icon type="upload"/>上传
      </Button>
    </form>
  );
}

export default UploadFile;
