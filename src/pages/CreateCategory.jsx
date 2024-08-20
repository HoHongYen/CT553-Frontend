import CreateCategoryForm from "../features/category/CreateCategoryForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function CreateCategory() {

  return (
    <>
      <Heading as="h1">Thêm danh mục</Heading>

      <Row>
        {/* <Heading as="h3">Thông tin cá nhân</Heading> */}
        <CreateCategoryForm />
      </Row>
    </>
  );
}

export default CreateCategory;
