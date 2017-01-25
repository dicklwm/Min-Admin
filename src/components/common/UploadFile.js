import React from 'react';
import { v3Address } from '../../utils/config';
import { Button, Upload, Icon } from 'antd';

function UploadFile ({}) {
  return (
    <Upload
      name='file'
      action={v3Address + '/module-operation!executeOperation'}
      data={{
        operation: 'FileUpload',
        ajaxRequest: 'true'
      }}
    >
      <Button type="ghost">
        <Icon type="upload"/>上传
      </Button>
    </Upload>
  );
}

export default UploadFile;
