import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategories";

export function useCategories() {
    const { isLoading, data: { metadata } = {} } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    })

    return { isLoading, categories: metadata };
}

