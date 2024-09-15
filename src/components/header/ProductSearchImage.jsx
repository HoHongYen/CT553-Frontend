import { useEffect, useState } from "react";
import { HiOutlineCamera, HiOutlineCloudArrowUp } from "react-icons/hi2";
import ButtonIcon from "../ui/ButtonIcon";
import Modal from "../ui/Modal";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { destroyImageInDisk, uploadImageToDisk } from "@/services/apiUpload";
import { set } from "date-fns";
import Button from "../ui/Button";

function ProductSearchImage({ setIsSearchOpen }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const [inputImageUrl, setInputImageUrl] = useState("");

  async function handleUploadImageToSearch(e) {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    try {
      const res = await uploadImageToDisk(formData);
      console.log("res", res);
      const imageUrlRes = `${import.meta.env.VITE_API_BASE_URL}/${
        res.metadata.path
      }`;
      //   setImageUrl(URL.createObjectURL(file));
      setUploadedImageUrl(imageUrlRes);
      console.log("imageUrl", imageUrl);
      console.log("uploadedImageUrl", uploadedImageUrl);
      // router.push({ path: "/tim-kiem", query: { imageUrl } });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDestroyUpdatedImage() {
    console.log("uploadedImageUrl", uploadedImageUrl);
    // get from index 2
    let pop1 = uploadedImageUrl.split("/").pop().split("\\").pop();
    console.log("uploadedImageUrl.split", pop1);
    await destroyImageInDisk(pop1);
    setUploadedImageUrl("");
  }

  useEffect(() => {
    if (uploadedImageUrl !== "") {
      console.log("uploadedImageUrl in useEffect", uploadedImageUrl);
      setImageUrl(uploadedImageUrl);
      setInputImageUrl("");
    }
  }, [uploadedImageUrl]);

  useEffect(() => {
    if (inputImageUrl !== "") {
      setImageUrl(inputImageUrl);
    }
  }, [inputImageUrl]);

  useEffect(() => {
    if (imageUrl !== "") {
      console.log("imageUrl", imageUrl);
      setSearchQuery(imageUrl);
      searchParams.delete("s");
      searchParams.set("imageUrl", imageUrl);
      setSearchParams(searchParams);
      navigate(`/tim-kiem/?${searchParams.toString()}`);
    }
  }, [imageUrl]);

  return (
    <Modal>
      <Modal.Open opens="customImage">
        <ButtonIcon onClick={() => setIsSearchOpen(true)}>
          <HiOutlineCamera />
        </ButtonIcon>
      </Modal.Open>
      <Modal.Window name="customImage">
        <div className="h-[60vh] w-[40vw] flex flex-col gap-12">
          <Heading as="h2" className="flex justify-center">
            Tìm kiếm sản phẩm bằng hình ảnh
          </Heading>
          <div className="flex flex-col gap-8">
            <div className="flex gap-8 max-h-[35vh] max-w-[60vw]">
              <div className="overflow-hidden border-2 border-dashed border-[var(--color-grey-300)] ">
                <img
                  src={imageUrl !== "" ? imageUrl : "/default-image.png"}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-4 items-center">
                  <HiOutlineCloudArrowUp />
                  <p>Tải lên ảnh cần tìm</p>
                </div>
                <input type="file" onChange={handleUploadImageToSearch} />
                <Button
                  onClick={handleDestroyUpdatedImage}
                  className="mt-5 w-[50%]"
                >
                  Xóa ảnh tải lên
                </Button>
              </div>
            </div>
            <div className=" flex flex-col gap-5">
              <div className="flex gap-4 items-center">
                <p>Hoặc thêm link ảnh</p>
              </div>
              <Input
                value={inputImageUrl}
                onChange={(e) => setInputImageUrl(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Modal.Window>
    </Modal>
  );
}

export default ProductSearchImage;
