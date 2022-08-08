import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { apiPostShare } from '../../../services/api/movie';
import { MovieParams } from '../../../types/Movie';
import { youtubeUrlRegex } from '../../../utils/regex';
import path from '../../routers/path';

export default function MovieShare() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const onSubmit = async (values: MovieParams) => {
    await apiPostShare(values);
    navigate(path.root);
  };

  const clearError = () => {
    setError(false);
  };

  const authSchema = Yup.object()
    .shape({
      url: Yup.string()
        .required('Please enter youtube url')
        .matches(youtubeUrlRegex, 'Youtube URL must be a valid')
        .max(255, 'Youtube URL must be less than 255 digits'),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MovieParams>({
    resolver: yupResolver(authSchema),
  });

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" textAlign="center" mb={1}>
        Share a youtube movie
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1} justifyContent="center" alignItems="center">
          <Controller
            control={control}
            name="url"
            render={({ field }) => (
              <TextField
                fullWidth
                sx={{
                  position: 'relative',
                  margin: '0 0 10px 0',
                  '& input': {
                    padding: '8px 15px',
                    fontSize: '16px',
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: '#fbfbfc',
                    borderRadius: '8px',
                    padding: 0,
                  },
                }}
                {...field}
                error={!!errors.url || error}
                helperText={errors?.url?.message}
                placeholder="Youtube url"
                onFocus={clearError}
              />
            )}
          />
          <LoadingButton
            data-testid="button-share"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{
              borderRadius: '8px',
              margin: '0 !important',
            }}
          >
            Share
          </LoadingButton>
        </Stack>
      </form>
    </Card>
  );
}
