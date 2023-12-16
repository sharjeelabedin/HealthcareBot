import React from "react";

export type ErrorBoundaryType = {
    message : string | null;
    description : React.ReactNode | string;
    placement : "topLeft" | "bottom" | "top" | "topRight" | "bottomLeft" | "bottomRight" | undefined;
    type : NotificationType;
}
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type ErrorBoundaryProps = {
    children : React.ReactNode
}    