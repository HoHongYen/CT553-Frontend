import { useQuery } from "@tanstack/react-query";
import { getCurrentPolicy } from "@/services/apiPaymentPolicies";

export function usePaymentPolicy() {
    const {
        isLoading,
        data: { metadata: paymentPolicy } = {},
        error,
    } = useQuery({
        queryKey: ["paymentPolicy"],
        queryFn: getCurrentPolicy,
        retry: false,
    });
    return { isLoading, paymentPolicy, error };
}