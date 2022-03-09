// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  EcommerceWelcome,
  EcommerceNewProducts,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceSaleByGender,
  EcommerceWidgetSummary,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance,
} from '../../sections/@dashboard/general/e-commerce';
import SaleTable from "../../sections/@dashboard/agentApproval/SalesApprovalAgents"
import AgentDetails from "../../sections/@dashboard/agentApproval/AgentDetails"
// ----------------------------------------------------------------------

export default function SalesApproval() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="General: E-commerce">
      
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {
            <Grid item xs={12} md={12} lg={12}>
              <AgentDetails />
              <SaleTable />
            </Grid>
          }

        </Grid>
      </Container>
    </Page>
  );
}
