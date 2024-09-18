import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { destroyImageInDisk, uploadImageToDisk } from "@/services/apiUpload";
import { HiOutlineCloudArrowUp } from "react-icons/hi2";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import Button from "../ui/Button";

function ProductSearchImageModal({ setIsSearchOpen, onCloseModal }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputImageUrl, setInputImageUrl] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  async function handleUploadImageToSearch(e) {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    try {
      const res = await uploadImageToDisk(formData);
      console.log("res", res);
      const imageUrl = `${import.meta.env.VITE_API_BASE_URL}/${
        res.metadata.path
      }`;
      setUploadedImageUrl(imageUrl);
      setInputImageUrl(URL.createObjectURL(file));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDestroyUpdatedImage() {
    setInputImageUrl("");
    console.log("uploadedImageUrl", uploadedImageUrl);
    let pop1 = uploadedImageUrl.split("/").pop().split("\\").pop();
    console.log("uploadedImageUrl.split", pop1);
    await destroyImageInDisk(pop1);
    setUploadedImageUrl("");
    document.getElementById("image-file").value = null;
  }

  function handleSearchByImageUrl() {
    const imageUrl = uploadedImageUrl ? uploadedImageUrl : inputImageUrl;

    console.log("imageUrl", imageUrl);

    setSearchQuery(imageUrl);
    searchParams.delete("s");
    searchParams.set("imageUrl", imageUrl);
    setSearchParams(searchParams);
    navigate(`/tim-kiem/?${searchParams.toString()}`);
    setInputImageUrl("");
    setIsSearchOpen(false);
  }

  return (
    <div className="min-h-[50vh] w-[40vw] flex flex-col gap-12">
      <Heading as="h2" className="flex justify-center">
        Tìm kiếm sản phẩm bằng hình ảnh
      </Heading>
      <div className="flex flex-col gap-8">
        <div className="flex gap-8 h-[35vh] min-w-[40vw] w-[40vw] max-w-[40vw]">
          <div className="overflow-hidden border-2 border-dashed border-[var(--color-grey-300)] ">
            <img
              src={inputImageUrl !== "" ? inputImageUrl : "/default-image.png"}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-4 items-center">
              <HiOutlineCloudArrowUp />
              <p>Tải lên ảnh cần tìm</p>
            </div>
            <input
              type="file"
              id="image-file"
              onChange={handleUploadImageToSearch}
            />
            {uploadedImageUrl && (
              <div>
                <Button onClick={handleDestroyUpdatedImage}>
                  Xóa ảnh tải lên
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-4 items-center">
            <p>Hoặc thêm link ảnh</p>
          </div>
          <Input
            value={inputImageUrl}
            onChange={(e) => setInputImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchByImageUrl();
                onCloseModal?.();
              }
            }}
            className="w-full"
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              handleSearchByImageUrl();
              onCloseModal?.();
            }}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductSearchImageModal;
