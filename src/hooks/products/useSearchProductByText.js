import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { search as searchApi } from "@/services/apiProducts";

export function useSearchProductByText() {
    const [searchParams] = useSearchParams();

    // SEARCH
    const searchText = searchParams.get("s");

    // QUERY
    const {
        isLoading,
        data: { metadata: { fullTextSearchResult, semanticSearchResult } } = { metadata: { fullTextSearchResult: [], semanticSearchResult: [] } },
    } = useQuery({
        queryKey: ["productSearch", searchText],
        queryFn: () => searchApi(searchText),
    });

    return { isLoading, fullTextSearchResult, semanticSearchResult };
}