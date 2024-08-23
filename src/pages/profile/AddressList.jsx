import styled from "styled-components";
import { useUser } from "@/hooks/profile/useUser";

import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Sidebar from "@/components/profile/Sidebar";
import Button from "@/components/ui/Button";
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
  const { user } = useUser();

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <StyledPolicyLayout>
        <Sidebar />
        <Row>
          <Heading as="h1">Sổ địa chỉ</Heading>
          <div className="flex justify-end">
            <AddAddress />
          </div>
          <AddressTable />
        </Row>
      </StyledPolicyLayout>
    </>
  );
}

export default AddressList;
