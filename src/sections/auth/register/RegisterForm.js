import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('FirstName is required'),
    lastName: Yup.string().required('LastName is required'),
    email: Yup.string().required('Email is required').email(),
    password: Yup.string().required('Password is required'),
    confirmpassword: Yup.string().required('Confirm Password is required'),
    picture: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    city: Yup.string().required('Password is required'),
    country: Yup.string().required('Password is required'),
    phone: Yup.string().required('Password is required'),
    state: Yup.string().required('Confirm Password is required'),
    agentId: Yup.string().required('Confirm Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: '',
    picture: '',
    city: '',
    country: '',
    phone: '',
    state: '',
    agentId: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,

    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("lastName", data.lastName)
      formData.append("firstName", data.firstName)
      formData.append("email", data.email)
      formData.append("password", data.password)
      formData.append("confirmpassword", data.confirmpassword)
      formData.append("picture", data.picture)
      formData.append("city", data.city)
      formData.append("country", data.country)
      formData.append("phone", data.phone)
      formData.append("state", data.state)
      formData.append("agentId", data.agentId)
      const response = await axios.post(`api/register/seller`, formData);
      const { message } = response.data;
      enqueueSnackbar(message);
      navigate(PATH_DASHBOARD.general.saleApproval);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
