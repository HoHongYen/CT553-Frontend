import { useQuery } from "@tanstack/react-query";
import { getValidCoupons } from "@/services/apiCoupons";

export function useCoupons() {
    const { isLoading, data: { metadata } = { metadata: [] } } = useQuery({
        queryKey: ["coupons"],
        queryFn: getValidCoupons,
    })

    return { isLoading, coupons: metadata };
}

