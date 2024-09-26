import { handleClickElement } from "@/utils/helpers";
import { HiCamera, HiPencil, HiTrash } from "react-icons/hi2";

function UploadReviewImage({ isUploadingImage, images, setImages }) {

  const handleAddProductImage = (e) => {
    const files = e.target.files;
    setImages((images) => [
      ...images,
      {
        file: files[0],
        path: URL.createObjectURL(files[0]),
      },
    ]);
  };

  const handleEditProductImage = (e, index) => {
    const files = e.target.files;
    setImages((images) => {
      const newImages = [...images];
      newImages[index] = {
        file: files[0],
        path: URL.createObjectURL(files[0]),
      };
      return newImages;
    });
  };

  const handleRemoveImage = (e, index) => {
    e.preventDefault();
    setImages((images) => images.filter((_, i) => i !== index));
  };

  return (
    <div
      id="image"
      className="mt-3 flex flex-col gap-5 py-[1.2rem] border-b border-[var(--color-grey-100)]"
    >
      <div className="flex gap-5">
        <label className="font-[700] text-[1.5rem]">Thêm hình ảnh:</label>
      </div>
      <div className="grid grid-cols-5 gap-2 border rounded p-4">
        {images.map((image, index) => (
          <div
            key={image.path}
            className="relative ol-span-1 flex items-center justify-center border-2 border-dashed border-slate-200"
          >
            <div className="overflow-hidden">
              <img
                src={image.path}
                className="transition-all duration-700 hover:scale-105"
              />
            </div>
            <div className="cursor-pointer flex gap-1 absolute top-2 right-2">
              <HiPencil
                className="h-8 w-8"
                onClick={() => handleClickElement(`editProductImage_${index}`)}
              />
              <HiTrash
                className="h-8 w-8"
                onClick={(e) => handleRemoveImage(e, index)}
              />
              <div className="absolute top-0 left-0 invisible">
                <input
                  accept="image/*"
                  type="file"
                  id={`editProductImage_${index}`}
                  onChange={(e) => handleEditProductImage(e, index)}
                  disabled={isUploadingImage}
                />
              </div>
            </div>
          </div>
        ))}

        <div
          onClick={() => handleClickElement("productImages")}
          className="cursor-pointer relative col-span-1 w-[150px] h-[150px] flex items-center justify-center border-2 border-dashed border-slate-200"
        >
          <HiCamera className="h-14 w-14" />
          <div className="absolute top-0 left-0 invisible">
            <input
              accept="image/*"
              type="file"
              id="productImages"
              multiple
              onChange={handleAddProductImage}
              disabled={isUploadingImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadReviewImage;
