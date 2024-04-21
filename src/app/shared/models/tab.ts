export interface ITab {
    id: string;
    title: string;
    active: boolean;
    checkForUpdates(): void;
    close(): void;
}
