import { useQuery } from "@tanstack/react-query";
import { getCollectedCoupons } from "@/services/apiCoupons";

export function useCollectedCoupons() {
    const { isLoading, data: { metadata } = { metadata: [] } } = useQuery({
        queryKey: ["collectedCoupons"],
        queryFn: getCollectedCoupons,
    })

    return { isLoading, collectedCoupons: metadata };
}

