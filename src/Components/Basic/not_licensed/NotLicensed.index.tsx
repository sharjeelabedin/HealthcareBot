import { Button, Result } from 'antd';
import React from 'react';

// Display when the DG is not licensed.
export default (): JSX.Element => {
  return (
    <Result
      status="403"
      title="Data Governance is not licensed on your server. Please contact sales@astera.com for assistance."
    />
  );
};
