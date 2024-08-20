import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory as createCategoryApi } from "../../services/apiCategories";
import toast from "react-hot-toast";

export function useCreateCategory() {
    const queryClient = useQueryClient();
    const { mutate: createCategory, isLoading } = useMutation({
        mutationFn: (data) => createCategoryApi(data),
        onSuccess: (category) => {
            console.log(category);
            toast.success("Thêm danh mục thành công!");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi thêm danh mục!");
        }
    })

    return { createCategory, isLoading };
}