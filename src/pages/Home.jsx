import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import BreadCrumb from "../ui/BreadCrumb";

const breadcrumb = [];

function Home() {
  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <Row type="horizontal">
        <Heading as="h1">Trang chủ</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Home;
