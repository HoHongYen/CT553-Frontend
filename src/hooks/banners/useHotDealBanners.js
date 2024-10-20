import { useQuery } from "@tanstack/react-query";
import { getHotDealBanners } from "@/services/apiBanners";

export function useHotDealBanners() {
    const { isLoading, data: { metadata } = { metadata: [] } } = useQuery({
        queryKey: ["hotDealBanners"],
        queryFn: getHotDealBanners,
    })

    return { isLoading, hotDealBanners: metadata };
}

