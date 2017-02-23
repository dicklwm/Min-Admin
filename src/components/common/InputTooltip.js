import React from 'react';
import { Input, Tooltip } from 'antd';

function InputTooltip ({ value }) {
  return (
    <Tooltip title={value || ''}>
      <Input value={value || ''} disabled style={{ color: "#000" }}/>
    </Tooltip>
  );
}

export default InputTooltip;
