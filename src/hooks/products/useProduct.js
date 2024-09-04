import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOneBySlug } from "../../services/apiProducts";

export function useProduct() {
    const { slug } = useParams();
    const {
        isLoading,
        data: { metadata: product } = {},
        error,
    } = useQuery({
        queryKey: ["product", slug],
        queryFn: () => getOneBySlug(slug),
        retry: false,
    });
    return { isLoading, product, error };
}