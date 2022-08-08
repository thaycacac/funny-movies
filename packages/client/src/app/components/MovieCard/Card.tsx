import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { Stack } from '@mui/material';

export default function MovieCard() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 275 }}
        image="https://www.techsmith.com/blog/wp-content/uploads/2020/09/how-to-make-a-product-demo-hero.png"
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography component="div" variant="h5">
              Movie Title
            </Typography>
            <div>
              <ThumbUpOutlinedIcon fontSize="large" sx={{ mr: 2 }} />
              <ThumbDownOffAltOutlinedIcon fontSize="large" />
            </div>
          </Stack>
          <Typography variant="subtitle1" color="text.secondary">
            Shared by: thaycacac@gmail.com
          </Typography>
          <Stack direction="row" alignItems="center">
            <Typography
              fontWeight="bold"
              mr={1}
              variant="subtitle1"
              color="text.secondary"
            >
              89
            </Typography>
            <ThumbUpOutlinedIcon sx={{ mr: 2 }} />
            <Typography
              fontWeight="bold"
              mr={1}
              variant="subtitle1"
              color="text.secondary"
            >
              89
            </Typography>
            <ThumbDownOffAltOutlinedIcon />
          </Stack>
          <Typography variant="subtitle1" color="text.secondary">
            Description:
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
