import { getAddressesOfCurrentUser } from "@/services/apiAddresses";
import { useQuery } from "@tanstack/react-query";

export function useAddresses() {
    const { isLoading, data: { metadata } = {} } = useQuery({
        queryKey: ["addresses"],
        queryFn: getAddressesOfCurrentUser,
    })

    return { isLoading, addresses: metadata };
}



