import { notification } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store';
import { useAppDispatch } from '../../../Store/hooks';
import { clearErrorState } from './redux/slice';
import { NotificationType } from './redux/types';

const ErrorBoundary = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const errorState = useSelector((state: RootState) => state.ErrorBoundaryReducer);
  const openNotificationWithIcon = (type: NotificationType) => {
    notification[type]({
      message: errorState.message,
      description: errorState.description,
      placement: errorState.placement,
      onClose : ()=>{dispatch(clearErrorState())}
    });
  };
  useEffect(() => {
    if (errorState.message !== null) {
      openNotificationWithIcon(errorState.type)
    }
    else(notification.destroy())
    
  }, [errorState])

  return <></>
}

export default ErrorBoundary;