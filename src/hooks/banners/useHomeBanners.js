import { useQuery } from "@tanstack/react-query";
import { getHomeBanners } from "@/services/apiBanners";

export function useHomeBanners() {
    const { isLoading, data: { metadata } = { metadata: [] } } = useQuery({
        queryKey: ["homeBanners"],
        queryFn: getHomeBanners,
    })

    return { isLoading, homeBanners: metadata };
}

