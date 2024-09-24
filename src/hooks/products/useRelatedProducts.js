
import { useQuery } from "@tanstack/react-query";
import { getRelatedProducts } from "@/services/apiProducts";
import { useProduct } from "./useProduct";

export function useRelatedProducts() {
    const { product } = useProduct();
    const {
        isLoading,
        data: { metadata: relatedProducts } = { metadata: [] },
    } = useQuery({
        queryKey: ["relatedProducts", product.id],
        queryFn: () => getRelatedProducts(product.id),
    });

    return { isLoading, relatedProducts };
}