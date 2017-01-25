import React from 'react';
import { connect } from 'dva';
import Iframe from '../../components/Iframe';
import {v3Address} from '../../utils/config';

/**
 * Route 流程定义
 * @returns {XML}
 * @constructor
 */

function Definition () {
  return (
    <Iframe
      src={v3Address + "/module-operation!executeOperation?operation=Form&componentCode=vbase_workflow&windowCode=wf_df_page"}
      height="616"
    />
  );
}

function mapStateToProps () {
  return {};
}

export default connect(mapStateToProps)(Definition);
