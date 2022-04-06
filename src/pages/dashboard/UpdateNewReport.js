import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink ,useNavigate} from 'react-router-dom';
import { useSnackbar } from 'notistack';


// @mui
import { useTheme } from '@mui/material/styles';
import {
    Card,
    Grid,
    Table,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    Stack,
} from '@mui/material';
import MUIDataTable from "mui-datatables";
import { LoadingButton } from '@mui/lab';
import { BsFillEyeFill, BsFillCheckCircleFill } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
// routes
import { PATH_DASHBOARD } from '../../routes/paths';


// hooks
import useSettings from '../../hooks/useSettings';
import useAuth from '../../hooks/useAuth';
// utils
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UpdateReport from '../../sections/@dashboard/SaleReport/UpdateReport'
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------


export default function SalesApproval() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
  


    return (
        <Page title="">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Grid>
                    <Card>
                        <UpdateReport /> 
                    </Card>
                </Grid>
            </Container>
        </Page >
    );
}

// ----------------------------------------------------------------------
