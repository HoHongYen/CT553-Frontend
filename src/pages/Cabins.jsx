import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import BreadCrumb from "../ui/BreadCrumb";

const breadcrumb = [
  {
    name: "Khuyến mãi",
  },
];

function Cabins() {
  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
