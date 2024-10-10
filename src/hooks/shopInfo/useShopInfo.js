import { useQuery } from "@tanstack/react-query";
import { getShopInfo } from "@/services/apiShopInfo";

export function useShopInfo() {
    const {
        isLoading,
        data: { metadata: shopInfo } = {},
        error,
    } = useQuery({
        queryKey: ["shopInfo"],
        queryFn: () => getShopInfo(),
        retry: false,
    });
    return { isLoading, shopInfo, error };
}