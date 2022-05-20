import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// utli
import axios from '../../../utils/axios';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFSelect } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('firstName is required'),
    lastName: Yup.string().required('lastName is required'),
    email: Yup.string().required('email is required'),
    agentEmail: Yup.string().required('agentEmail is required'),
    password: Yup.string().required('password is required'),
    confirmpassword: Yup.string().required('confirmpassword is required'),
    city: Yup.string().required('city is required'),
    // country: Yup.string().required('country is required'),
    phone: Yup.string().required('phone is required'),
    state: Yup.string().required('state is required'),

  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    agentEmail: '',
    password: '',
    confirmpassword: '',
    city: '',
    // country: '',
    phone: '',
    state: '',

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
  useEffect(() => {
    Agents();
    State()
  }, [])
  const [agent, setAgent] = useState([])
  const [Show, setShow] = useState(false)
  const Agents = async () => {
    try {
      const response = await axios.get(`api/get/agents`);
      const { agents } = response.data;
      setAgent(agents)
      setShow(true)
    } catch (error) {
      console.error(error);
    }
  };
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
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("lastName", data.lastName)
      formData.append("firstName", data.firstName)
      formData.append("email", data.email)
      formData.append("agentEmail", data.agentEmail)
      formData.append("password", data.password)
      formData.append("confirmpassword", data.confirmpassword)
      formData.append("city", data.city)
      formData.append("country", data.country)
      formData.append("phone", data.phone)
      formData.append("state", data.state)
      formData.append("agentId", data.agentId)
      const response = await axios.post(`api/register/seller`, formData);
      const { message, inputErrors } = response.data;
      enqueueSnackbar(message);
      if (inputErrors.firstName) {
        enqueueSnackbar(inputErrors?.firstName, { variant: 'error' });
      }
      if (inputErrors.lastName) {
        enqueueSnackbar(inputErrors?.lastName, { variant: 'error' });
      }
      if (inputErrors.email) {
        enqueueSnackbar(inputErrors?.email, { variant: 'error' });
      }
      if (inputErrors.agentEmail) {
        enqueueSnackbar(inputErrors?.agentEmail, { variant: 'error' });
      }
      if (inputErrors.password) {
        enqueueSnackbar(inputErrors?.password, { variant: 'error' });
      }
      if (inputErrors.confirmpassword) {
        enqueueSnackbar(inputErrors?.confirmpassword, { variant: 'error' });
      }
      if (inputErrors.city) {
        enqueueSnackbar(inputErrors?.city, { variant: 'error' });
      }
      if (inputErrors.country) {
        enqueueSnackbar(inputErrors?.country, { variant: 'error' });
      }
      if (inputErrors.phone) {
        enqueueSnackbar(inputErrors?.phone, { variant: 'error' });
      }
      if (inputErrors.state) {
        enqueueSnackbar(inputErrors?.state, { variant: 'error' });
      }
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
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="city" label="City" />
          {/* <RHFTextField name="country" label="Country" /> */}
          <RHFTextField name="phone" label="Phone" />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
         <RHFSelect name="state" label="State" >
          <option value='' />
          {!Show2 ? <option value='' >No State Found</option> :
                  state.map((option) => (
                    <option key={option.id} value={option.state}>
                      {option.state} ({option.code})
                    </option>
                  ))}
        </RHFSelect>
        
        </Stack>
        <RHFSelect name="agentEmail" label="Agent" >
          <option value='' />
          {!Show ? <option value='' >No Agent Found</option> :
                  agent.map((option) => (
                    <option key={option.id} value={option.email}>
                      {option.name}
                    </option>
                  ))}
        </RHFSelect>
        
        <RHFTextField name="email" label="Email address" />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
          <RHFTextField
            name="confirmpassword"
            label="Confirm Password"
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
        </Stack>


        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
