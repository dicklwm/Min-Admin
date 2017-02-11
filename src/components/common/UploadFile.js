import React from 'react';
import { Button, Icon, Upload, message } from 'antd';

function UploadFile ({ uploading, done, error, accept }) {
  return (
    <Upload
      name='file'
      action='/fileUpload'
      showUploadList={false}
      onChange={(info) => {
        if (info.file.status==='uploading') {
          uploading && uploading(info.file);
          console.log(info.file, info.fileList);
          message.info(`${info.file.name} 正在上传`);
        }
        if (info.file.status==='done') {
          done && done(info.file);
          message.success(`${info.file.name} 上传成功`, 5);
        } else if (info.file.status==='error') {
          error && error(info.file);
          message.error(`${info.file.name} 上传失败`, 5);
        }
      }}
      accept={accept}
    >
      <Button type="ghost">
        <Icon type="upload"/>上传
      </Button>
    </Upload>
  );
}

export default UploadFile;
