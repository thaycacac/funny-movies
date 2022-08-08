import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';

import { Stack } from '@mui/material';
import { Movie } from '../../../types/Movie';

import ActionStatus from './ActionStatus';

type Props = {
  movie: Movie;
};

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2 }}>
      <iframe
        width="400"
        height="250"
        style={{
          border: 'none',
        }}
        src={`https://www.youtube.com/embed/${movie.youtubeId}?&mute=1`}
        title="youtube video"
      ></iframe>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              component="div"
              variant="h5"
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
            >
              {movie.title}
            </Typography>
            <ActionStatus id={movie.id} status={movie.status} />
          </Stack>
          <Typography variant="subtitle1" color="text.secondary">
            Shared by: {movie.sharedBy}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Typography
              fontWeight="bold"
              mr={1}
              variant="subtitle1"
              color="text.secondary"
            >
              {movie.likeCount}
            </Typography>
            <ThumbUpOutlinedIcon sx={{ mr: 2 }} />
            <Typography
              fontWeight="bold"
              mr={1}
              variant="subtitle1"
              color="text.secondary"
            >
              {movie.dislikeCount}
            </Typography>
            <ThumbDownOffAltOutlinedIcon />
          </Stack>
          <Typography variant="subtitle1" color="text.secondary">
            Description:
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 4,
            }}
          >
            {movie.description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default MovieCard;
