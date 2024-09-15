import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchByImageUrl as searchApi } from "@/services/apiProducts";

export function useSearchProductByImage() {
    const [searchParams] = useSearchParams();

    // SEARCH
    const searchByImageUrl = searchParams.get("imageUrl");

    // QUERY
    const {
        isLoading,
        data: { metadata: { products } } = { metadata: { products: [] } },
    } = useQuery({
        queryKey: ["productSearch", searchByImageUrl],
        queryFn: () => searchApi(searchByImageUrl),
    });

    return { isLoading, products };
}