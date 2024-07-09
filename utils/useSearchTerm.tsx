import { useEffect, useState } from "react";

export const useSearchTerm = () => {
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');

    useEffect(() => {
        localStorage.setItem('searchTerm', searchTerm);
    }, [searchTerm]);

    return [searchTerm, setSearchTerm] as const;
};