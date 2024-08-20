import { useMutation } from "@tanstack/react-query";
import { uploadImage as uploadImageApi } from "../../services/apiUpload";
import toast from "react-hot-toast";

export function useUploadImage() {
    const { mutate: uploadImage, isLoading, data: { metadata: image } = {} } = useMutation({
        mutationFn: (data) => uploadImageApi(data),
        onSuccess: (res) => {
            console.log(res);
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi upload ảnh!");
        }
    })

    return { uploadImage, isLoading, image };
}