import { createCategoryWithUrl } from "../../services/apiCategories";
import Button from "../../ui/Button";

function UploadCategories() {
  async function handleUpload(e) {
    e.preventDefault();
    const res = await createCategoryWithUrl({
      name: "Tranh theo vị trí",
      slug: "tranh-theo-vi-tri",
      parentId: null,
      thumbnailImageUrl:
        // "https://lala.com.vn/_next/image?url=https%3A%2F%2Fstc.subi.vn%2Fimage%2F1%2F200525%2Ftranh-treo-tuong-la-xanh-nhiet-doi-moi-1.jpg&w=256&q=90",
        // "https://res.cloudinary.com/dphzvfcmy/image/upload/v1723975082/CT553/yxlk02c57azpzqfitueg.png",
        "https://lh3.googleusercontent.com/a/ACg8ocJsXk_85gzfTLg77X_PyAEmx0GbUcnHZxiRtWCaBj8yBfAEFCQ=s96-c",
    });
    console.log("Uploaded category 1", res);
  }

  return (
    <Button variation="danger" onClick={handleUpload}>
      Tạo tất cả danh mục
    </Button>
  );
}

export default UploadCategories;
