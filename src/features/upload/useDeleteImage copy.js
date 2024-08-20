import { useMutation } from "@tanstack/react-query";
import { destroyImage as destroyImageApi } from "../../services/apiUpload";

export function useDeleteImage() {
    const { mutate: deleteImage } = useMutation({
        mutationFn: (data) => destroyImageApi(data),
        onSuccess: (res) => {
            console.log(res);
        },
        onError: (error) => {
            console.log(error);
        }
    })
    return { deleteImage };
}