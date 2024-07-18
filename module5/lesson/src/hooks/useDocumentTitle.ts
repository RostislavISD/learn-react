import { useEffect } from "react";

export const useDocumentTitle = (title: string) => {
    useEffect(() => {
        document.title = `${title} - Гостиничный комплекс "Избёнка"`;
    }, [title]);

    return null;
}
