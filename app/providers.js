'use client';

import { StackProvider } from './context/StackContext';

export function Providers({ children }) {
    return (
        <StackProvider>
            {children}
        </StackProvider>
    );
}