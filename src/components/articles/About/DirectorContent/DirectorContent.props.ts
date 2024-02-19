import React from "react";

export interface DirectorContentProps {
    name: string;
    imageSource: string;
    expanded: boolean;
    summary: React.ReactNode;
    contentWidth: string;
}