import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import moment from 'moment';


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
    List,
    ListItem,
    ListItemText,
    Box,
    MenuItem,
    FormControl,
    TextField,
    InputAdornment
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
import LoadingScreen from '../../components/LoadingScreen';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------


export default function SalesApproval() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const { UpdateReports } = useAuth();
    const [AgentID, setAgentID] = useState(localStorage.getItem('AgentViewID'))
    const [AnnualizedHealthPremium, setAnnualizedHealthPremium] = useState([])
    const [AnnualizedLifePremium, setAnnualizedLifePremium] = useState([])
    const [HealthApplications, setHealthApplications] = useState([])
    const [LifeApplications, setLifeApplications] = useState([])
    const [OtherFinancialServices, setOtherFinancialServices] = useState([])
    const [RawNewAutoQuotes, setRawNewAutoQuotes] = useState([])
    const [RawNewAutoWritten, setRawNewAutoWritten] = useState([])
    const [TotalFireWritten, setTotalFireWritten] = useState([])
    const [StartDate, setStartDate] = useState('')
    const [EndDate, setEndDate] = useState('')
    const [showData, setShowData] = useState(false)

    useEffect(() => {
        try {
            GetAllSellerReport()
            // setData()
        } catch (error) {
            console.log(error)
        }
    }, [])
    const UserID = localStorage.getItem('UserID');

    const GetAllSellerReport = async () => {
        setShowData(false)
        const response = await axios.get(`api/seller/reports/${UserID}`);
        const { reports, message } = response.data;
        enqueueSnackbar(message);
        setData(reports)
        const AHP = reports.map((e) => (e.AnnualizedHealthPremium))
        const ALP = reports.map((e) => (e.AnnualizedLifePremium))
        const HP = reports.map((e) => (e.HealthApplications))
        const LP = reports.map((e) => (e.LifeApplications))
        const OFS = reports.map((e) => (e.OtherFinancialServices))
        const RNAQ = reports.map((e) => (e.RawNewAutoQuotes))
        const RNAW = reports.map((e) => (e.RawNewAutoWritten))
        const TFW = reports.map((e) => (e.OtherFinancialServices))
        setAnnualizedHealthPremium(AHP)
        setAnnualizedLifePremium(ALP)
        setHealthApplications(HP)
        setLifeApplications(LP)
        setOtherFinancialServices(OFS)
        setRawNewAutoQuotes(RNAQ)
        setRawNewAutoWritten(RNAW)
        setTotalFireWritten(TFW)
        setTimeout(() => {
            setShowData(true)
        }, 1000);
    }

    const StartDateState = (event) => {
        setStartDate(event.target.value);
    }
    const EndDateState = (event) => {
        setEndDate(event.target.value);
    }
    const FitlerReports = async () => {
        setShowData(false)
        const response = await axios.get(`api/seller/reports/${UserID}?startdate=${StartDate}&enddate=${EndDate}`);
        const { message, reports } = response.data;
        enqueueSnackbar(message);
        setData(reports)
        const AHP = reports.map((e) => (e.AnnualizedHealthPremium))
        const ALP = reports.map((e) => (e.AnnualizedLifePremium))
        const HP = reports.map((e) => (e.HealthApplications))
        const LP = reports.map((e) => (e.LifeApplications))
        const OFS = reports.map((e) => (e.OtherFinancialServices))
        const RNAQ = reports.map((e) => (e.RawNewAutoQuotes))
        const RNAW = reports.map((e) => (e.RawNewAutoWritten))
        const TFW = reports.map((e) => (e.OtherFinancialServices))
        setAnnualizedHealthPremium(AHP)
        setAnnualizedLifePremium(ALP)
        setHealthApplications(HP)
        setLifeApplications(LP)
        setOtherFinancialServices(OFS)
        setRawNewAutoQuotes(RNAQ)
        setRawNewAutoWritten(RNAW)
        setTotalFireWritten(TFW)

        setTimeout(() => {
            setShowData(true)
        }, 1000);
    }
    const SalePersonReportUpadte = async (e) => {
        const IDs = e;
        UpdateReports(IDs);
        localStorage.setItem('RepUpID', IDs);
        navigate(PATH_DASHBOARD.general.updatereport);
        // const response = await axios.get(`api/seller/report/${IDs}`);
        // const { message,reports } = response.data;
        // enqueueSnackbar(message);
        // setData()
    }
    const SalePersonDeleteReport = async (e) => {
        const IDs = e;
        setAgentID(localStorage.getItem('AgentViewID'))
        const response = await axios.post(`api/seller/report/delete/${IDs}`);
        const { message } = response.data;
        // console.log(response.data)
        enqueueSnackbar(message);
        GetAllSellerReport();

    }
    const columns = [
        {
            name: "created_at",
            label: "Date",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, row) => {
                    return (
                        <>
                            {moment(value).format('D MMMM YYYY')}
                        </>
                    );
                }
            }
        },
        {
            name: "RawNewAutoQuotes",
            label: "RawNewAutoQuotes",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "RawNewAutoWritten",
            label: "RawNewAutoWritten",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "TotalFireWritten",
            label: "TotalFireWritten",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LifeApplications",
            label: "LifeApplications",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "AnnualizedLifePremium",
            label: "AnnualizedLifePremium",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "HealthApplications",
            label: "HealthApplications",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "AnnualizedHealthPremium",
            label: "AnnualizedHealthPremium",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "OtherFinancialServices",
            label: "OtherFinancialServices",
            options: {
                filter: true,
                sort: true,
            }
        },


        {
            name: "id",
            label: "Actions",
            options: {
                customBodyRender: (value, row) => {
                    return (
                        <>

                            <LoadingButton size="small" variant="contained" style={{ margin: '10px' }} onClick={(e) => { SalePersonReportUpadte(value) }} >
                                Update
                            </LoadingButton>

                            <LoadingButton size="small" variant="contained" style={{ margin: '10px' }} onClick={(e) => { SalePersonDeleteReport(value) }} >
                                Delete
                            </LoadingButton>

                        </>
                    );
                }
            }
        }
    ];
    const options = {
        filterType: "dropdown",
        responsive: "scroll",
        selectableRows: false,

    };

    const [data, setData] = useState([]);


    return (
        <Page title="">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Grid>
                    <HeaderBreadcrumbs
                        heading="Sales Person Reports"
                        links={[
                            { name: 'Dashboard', href: PATH_DASHBOARD.root },
                            { name: 'Reports' },
                        ]}
                        action={
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to={PATH_DASHBOARD.general.addnewreport}
                                startIcon={<Iconify icon={'eva:plus-fill'} />}
                            >
                                New Report
                            </Button>
                        }
                    />

                    <Card>
                        <Box
                            sx={{
                                p: 3,
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                        >
                            <List>
                                <ListItem>
                                    <ListItemText primary="Raw New Auto Quotes" secondary={RawNewAutoQuotes.reduce((a, b) => a + b, 0)} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Raw New Auto Written" secondary={RawNewAutoWritten.reduce((a, b) => a + b, 0)} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Total Fire Written" secondary={TotalFireWritten.reduce((a, b) => a + b, 0)} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Life Applications" secondary={LifeApplications.reduce((a, b) => a + b, 0)} />
                                </ListItem>
                            </List>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Annualized Life Premium" secondary={AnnualizedLifePremium.reduce((a, b) => a + b, 0)} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Health Applications" secondary={HealthApplications.reduce((a, b) => a + b, 0)} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Annualized Health Premium" secondary={AnnualizedHealthPremium.reduce((a, b) => a + b, 0)} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Other Financial Services" secondary={OtherFinancialServices.reduce((a, b) => a + b, 0)} />
                                </ListItem>
                            </List>
                        </Box>
                        <Stack direction="row-reverse" >

                            <Button sx={{ m: 4, width: 20, height: 50 }} variant='outlined' onClick={(e) => { FitlerReports() }}>Search</Button>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                End Date<TextField
                                    type='date'
                                    placeholder="End Date"
                                    onChange={(e) => { EndDateState(e) }}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                Start Date  <TextField
                                    type='date'
                                    placeholder="Start Date"
                                    onChange={(e) => { StartDateState(e) }}
                                />
                            </FormControl>
                           
                        </Stack>
                        {showData ?
                            <MUIDataTable
                                title={"Sales Person Report"}
                                data={data}
                                columns={columns}
                                options={options}
                            /> : <LoadingScreen />}
                    </Card>
                </Grid>
            </Container>
        </Page >
    );
}

// ----------------------------------------------------------------------
