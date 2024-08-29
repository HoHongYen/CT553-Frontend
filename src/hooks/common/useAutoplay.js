import { useState } from "react";

export function useAutoplay() {
    const [autoplay, setAutoplay] = useQuery({
        queryKey: ["autoplay"]
    });

    return [autoplay, setAutoplay];
}
