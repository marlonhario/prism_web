import { PublicPageContent } from "common/interfaces";
import { Nullable } from "common/types";

export interface PublicPageContentProps {
    addToContentRef: (el: Nullable<HTMLLIElement>) => void;
    content: PublicPageContent[];
    className: string;
}

