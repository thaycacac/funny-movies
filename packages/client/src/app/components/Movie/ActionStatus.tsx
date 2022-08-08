import { Stack } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLogined } from '../Login/slice/selectors';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { EnumActionType } from '../../../enums';
import { useMovieSlice } from './slice';

type Props = {
  id: string;
  status: EnumActionType;
};

const ActionStatus: React.FC<Props> = ({ id, status }) => {
  const isLogined = useSelector(selectIsLogined);
  const { actions } = useMovieSlice();
  const dispatch = useDispatch();

  const handleActionMovie = (type: EnumActionType) => {
    dispatch(actions.triggerAction({ id, type }));
  };

  return (
    <>
      {!isLogined && (
        <Stack direction="row" alignItems="center">
          {status === EnumActionType.UNVOTE ? (
            <>
              <ThumbUpOutlinedIcon
                fontSize="large"
                sx={{ mr: 2, cursor: 'pointer' }}
                onClick={() => handleActionMovie(EnumActionType.LIKE)}
              />
              <ThumbDownOffAltOutlinedIcon
                fontSize="large"
                sx={{ mr: 1, cursor: 'pointer' }}
                onClick={() => handleActionMovie(EnumActionType.DISLIKE)}
              />
              <span>(un-voted)</span>
            </>
          ) : status === EnumActionType.LIKE ? (
            <>
              <ThumbUpIcon fontSize="large" sx={{ mr: 1, cursor: 'pointer' }} />
              <span>(voted up)</span>
            </>
          ) : (
            <>
              <ThumbDownIcon
                fontSize="large"
                sx={{ mr: 1, cursor: 'pointer' }}
              />
              <span>(voted down)</span>
            </>
          )}
        </Stack>
      )}
    </>
  );
};

export default ActionStatus;
