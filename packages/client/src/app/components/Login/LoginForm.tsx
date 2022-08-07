import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { AuthParams } from '../../../types/Auth';
import { emailRegex } from '../../../utils/regex';

interface Props {
  onSubmit: (values: AuthParams) => void;
  error?: any;
  onClearError: () => void;
}

export default function Login(props: Props) {
  const { onSubmit, error, onClearError } = props;
  const [showPassword, setShowPassword] = useState(false);

  const authSchema = Yup.object()
    .shape({
      email: Yup.string()
        .required('Please enter your email')
        .matches(emailRegex, 'Email must be a valid email')
        .max(255, 'Email must be less than 255 digits'),
      password: Yup.string()
        .required('Please enter your password')
        .max(255, 'Password must be less than 255 digits'),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthParams>({
    resolver: yupResolver(authSchema),
  });

  const handleShowPassword = useCallback(() => {
    setShowPassword(show => !show);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={1}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              sx={{
                position: 'relative',
                margin: '0 10px 0 0',
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
              error={!!errors.email || error}
              helperText={errors?.email?.message}
              placeholder="Email"
              onFocus={onClearError}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              sx={{
                position: 'relative',
                margin: '0 10px 0 0 !important',
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
              onFocus={onClearError}
              {...field}
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password || error}
              helperText={errors?.password?.message}
              placeholder={'Password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ margin: 0, position: 'absolute', right: '25px' }}
                  >
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon
                        icon={showPassword ? 'mdi:eye' : 'mdi:eye-off'}
                        color="#41225d"
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="outlined"
          color="inherit"
          sx={{
            borderRadius: '8px',
            margin: '0 !important',
            maxWidth: '12rem',
          }}
        >
          Login / Register
        </LoadingButton>
      </Stack>
    </form>
  );
}
