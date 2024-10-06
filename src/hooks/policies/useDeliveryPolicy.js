import { useQuery } from "@tanstack/react-query";
import { getCurrentPolicy } from "@/services/apiDeliveryPolicies";

export function useDeliveryPolicy() {
    const {
        isLoading,
        data: { metadata: deliveryPolicy } = {},
        error,
    } = useQuery({
        queryKey: ["deliveryPolicy"],
        queryFn: getCurrentPolicy,
        retry: false,
    });
    return { isLoading, deliveryPolicy, error };
}