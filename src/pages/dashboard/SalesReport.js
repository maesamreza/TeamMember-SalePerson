import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------


export default function SalesApproval() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const { UpdateReports } = useAuth();
    const [AgentID, setAgentID] = useState(localStorage.getItem('AgentViewID'))

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

        const response = await axios.get(`api/seller/reports/${UserID}`);
        const { reports, message } = response.data;
        enqueueSnackbar(message);

        setData(reports)
    }

    const SalePersonReportUpadte = async (e) => {
        const IDs = e;
        UpdateReports(IDs);
        localStorage.setItem('RepUpID',IDs);
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
            name: "id",
            label: "ID",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "AnnualizedHealthPremium",
            label: "Annualized Health Premium",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "AnnualizedLifePremium",
            label: "Annualized Life Premium",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "HealthApplications",
            label: "Health Applications",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LifeApplications",
            label: "Life Applications",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "OtherFinancialServices",
            label: "Other Financial Services",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "RawNewAutoQuotes",
            label: "Raw New Auto Quotes",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "RawNewAutoWritten",
            label: "Raw New Auto Written",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "TotalFireWritten",
            label: "Total Fire Written",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Actions",
            options: {
                customBodyRender: (value, row) => {
                    return (
                        <>

                            <LoadingButton size="small" variant="contained" style={{ margin: '10px' }} onClick={(e) => { SalePersonReportUpadte(row.rowData[0]) }} >
                                Update
                            </LoadingButton>

                            <LoadingButton size="small" variant="contained" style={{ margin: '10px' }} onClick={(e) => { SalePersonDeleteReport(row.rowData[0]) }} >
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
        selectableRows: true
    };

    const [data, setData] = useState([]);


    return (
        <Page title="SalePerson">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Grid>
                    <HeaderBreadcrumbs
                        heading="SalesPerson Reports"
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
                        {data !== null ?
                            <MUIDataTable
                                title={"SalesPerson"}
                                data={data}
                                columns={columns}
                                options={options}
                            /> : 'No SalePerson'}
                    </Card>
                </Grid>
            </Container>
        </Page >
    );
}

// ----------------------------------------------------------------------
