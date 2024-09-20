import styled from "styled-components";

import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Sidebar from "@/components/profile/Sidebar";
import AddressTable from "@/components/profile/addresses/AddressTable";
import AddAddress from "@/components/profile/addresses/AddAddress";

const breadcrumb = [{ name: "Tài khoản" }, { name: "Sổ địa chỉ" }];

const StyledPolicyLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  /* height: 100vh; */
  gap: 3rem;
`;

function AddressList() {
  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <StyledPolicyLayout>
        <Sidebar />
        <Row>
          <Heading as="h1">Sổ địa chỉ</Heading>
          <AddressTable />
          <div className="flex justify-end">
            <AddAddress />
          </div>
        </Row>
      </StyledPolicyLayout>
    </>
  );
}

export default AddressList;
