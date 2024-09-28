import { getTopReviews } from "@/services/apiReviews";
import { useQuery } from "@tanstack/react-query";

export function useTopReviews() {

    const { isLoading,
        data: { metadata } = { metadata: [] } } = useQuery({
            queryKey: ["topReviews"],
            queryFn: getTopReviews,
        })

    return { isLoading, topReviews: metadata };
}



