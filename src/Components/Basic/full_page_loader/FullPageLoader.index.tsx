import { Spin } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store';
import { useAppDispatch } from '../../../Store/hooks';
import { clearErrorState } from '../ErrorBoundary/redux/slice';
import style from "./style.module.css"

type Props = {
  classNames?: string;
  children? : React.ReactNode
};

function FullPageLoader({ classNames,children }: Props): JSX.Element {
  const loading = useSelector((state: RootState) => state.FullPageLoaderReducer.loading)
  const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(clearErrorState())
    },[])
  return (
    <div className={`full-page-loader ${classNames || ''}`}>
      <Spin spinning={loading} size="large" wrapperClassName={style["full-page-loader"]} style={{zIndex: 100000}}>{children}</Spin>
    </div>
  )
  
}

// PropTypes
FullPageLoader.propTypes = {
  classNames: PropTypes.string,
};

export default FullPageLoader;
