import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchByImageUrl as searchApi } from "@/services/apiProducts";

export function useSearchProductByImage() {
    const [searchParams] = useSearchParams();
    const searchByImageUrl = searchParams.get("imageUrl") || "";

    const {
        isLoading,
        data: { metadata: products } = { metadata: [] },
    } = useQuery({
        queryKey: ["productSearch", searchByImageUrl],
        queryFn: () => searchApi(searchByImageUrl),
        enabled: !!searchByImageUrl
    });

    console.log("searchByImageUrl in useSearchProductByImage", searchByImageUrl);
    return { isLoading, products };
}