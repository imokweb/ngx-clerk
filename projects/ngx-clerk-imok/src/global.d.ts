// In src/globals.d.ts

declare global {
    interface Window {
        Clerk: any;
    }
}

// You must add this empty export statement to make it a module
export { };