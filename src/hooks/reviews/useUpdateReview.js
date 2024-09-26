import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview as updateReviewApi } from "@/services/apiReviews";
import toast from "react-hot-toast";

export function useUpdateReview() {
    const queryClient = useQueryClient();
    const { mutate: updateReview, isLoading } = useMutation({
        mutationFn: ({ reviewId, updatedReview }) => updateReviewApi(reviewId, updatedReview),
        onSuccess: (review) => {
            console.log(review);
            toast.success("Cập nhật đánh giá thành công!");
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi cập nhật đánh giá!");
        }
    })

    return { updateReview, isLoading };
}