import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';

// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
import { countries } from '../../../_mock';
// components
import Label from '../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AddNewForm() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const NewUserSchema = Yup.object().shape({
        RawNewAutoQuotes: Yup.string().required('RawNewAutoQuotes is required'),
        RawNewAutoWritten: Yup.string().required('RawNewAutoWritten is required'),
        TotalFireWritten: Yup.string().required('TotalFireWritten is required'),
        LifeApplications: Yup.string().required('LifeApplications is required'),
        AnnualizedLifePremium: Yup.string().required('AnnualizedLifePremium is required'),
        HealthApplications: Yup.string().required('HealthApplications is required'),
        AnnualizedHealthPremium: Yup.string().required('AnnualizedHealthPremiumis required'),
        OtherFinancialServices: Yup.string().required('OtherFinancialServices is required'),
    });

    const defaultValues = useMemo(
        () => ({
            RawNewAutoQuotes: '',
            RawNewAutoWritten: '',
            TotalFireWritten: '',
            LifeApplications: '',
            AnnualizedLifePremium: '',
            HealthApplications: '',
            AnnualizedHealthPremium: '',
            OtherFinancialServices: '',
        }),

    );

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        watch,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("RawNewAutoQuotes", data.RawNewAutoQuotes)
            formData.append("RawNewAutoWritten", data.RawNewAutoWritten)
            formData.append("TotalFireWritten", data.TotalFireWritten)
            formData.append("LifeApplications", data.LifeApplications)
            formData.append("AnnualizedLifePremium", data.AnnualizedLifePremium)
            formData.append("HealthApplications", data.HealthApplications)
            formData.append("AnnualizedHealthPremium", data.AnnualizedHealthPremium)
            formData.append("OtherFinancialServices", data.OtherFinancialServices)
            const response = await axios.post(`api/seller/report/add`, formData);
            const { message } = response.data;
            enqueueSnackbar(message);
            navigate(PATH_DASHBOARD.general.salesReport);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>

                <Grid item xs={12} md={12}>
                    <Typography variant='h6' color='common.white' sx={{ p: 5 }}>
                        Add New Report
                    </Typography>
                    <Card sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                        >
                            <RHFTextField name="RawNewAutoQuotes" label="Raw New Auto Quotes" type='number' />
                            <RHFTextField name="RawNewAutoWritten" label="Raw New Auto Written" type='number' />
                            <RHFTextField name="TotalFireWritten" label="Total FireW ritten" type='number' />
                            <RHFTextField name="LifeApplications" label="Life Applications" type='number' />
                            <RHFTextField name="AnnualizedLifePremium" label="Annualized Life Premium" type='number' />
                            <RHFTextField name="HealthApplications" label="Health Applications" type='number' />
                            <RHFTextField name="AnnualizedHealthPremium" label="Annualized Health Premium" type='number' />
                            <RHFTextField name="OtherFinancialServices" label="Other Financial Services" type='number' />
                        </Box>

                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Add New Report
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
