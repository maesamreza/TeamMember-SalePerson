import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// Hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import axios from '../../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock
import { countries } from '../../../../_mock';
// components
import Label from '../../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function UserUpdate() {
  const { enqueueSnackbar } = useSnackbar();
  const userID = localStorage.getItem('UserID');
useEffect(()=>{
  State();
},[])

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('FirstName is required'),
    lastName: Yup.string().required('LastName is required'),
    picture: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    state: Yup.string().required('Confirm Password is required'),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      picture: '',
      state: '',

    }),

  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("lastName", data.lastName)
      formData.append("firstName", data.firstName)
      formData.append("picture", data.picture)
      formData.append("state", data.state)
      formData.append('city', data.city)
      formData.append('phone', data.phone)
      const response = await axios.post(`api/update/profile/seller/${userID}`, formData);
      const { message } = response.data;
      enqueueSnackbar(message);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'picture',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  const [state, setState] = useState([])
  const [Show2, setShow2] = useState(false)
  const State = async () => {
    try {
      const response = await axios.get(`api/get/states`);
      const { states } = response.data;
      setState(states)
      setShow2(true)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="picture"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                  </Typography>
                }
              />
            </Box>

          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="firstName" label="FirstName" />
              <RHFTextField name="lastName" label="LastName" />
              <RHFSelect name="state" label="State" >
                <option value='' />
                {!Show2 ? <option value='' >No State Found</option> :
                  state.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.state} ({option.code})
                    </option>
                  ))}
              </RHFSelect>
              <RHFTextField name="city" label="City" />
              <RHFTextField name="phone" label="Phone" />

            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
               Update Profile
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
