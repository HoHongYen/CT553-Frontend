import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
    const queryClient = useQueryClient();

    const { isLoading: isCreating, mutate: createCabin } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success("Cabin created");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return { isCreating, createCabin };
}