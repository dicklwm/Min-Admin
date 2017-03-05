import React from 'react';
import { Input, Tooltip } from 'antd';

function InputTooltip ({ value, disabled, onBlur, placeholder }) {
  return (
    <Tooltip title={value || ''}>
      <Input defaultValue={value || ''} disabled={disabled}
             style={disabled ? { color: "#000" } : {}}
             onBlur={onBlur} placeholder={placeholder}
      />
    </Tooltip>
  );
}

export default InputTooltip;
