import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { search as searchApi } from "@/services/apiProducts";

export function useSearchProducts() {
    const [searchParams] = useSearchParams();

    // SEARCH
    const search = searchParams.get("s");

    // QUERY
    const {
        isLoading,
        data: { metadata: { fullTextSearchResult, semanticSearchResult } } = { metadata: { fullTextSearchResult: [], semanticSearchResult: [] } },
    } = useQuery({
        queryKey: ["products", search],
        queryFn: () => searchApi(search),
    });

    return { isLoading, fullTextSearchResult, semanticSearchResult };
}