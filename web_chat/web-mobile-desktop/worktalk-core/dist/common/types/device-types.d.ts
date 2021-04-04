export interface Device {
    id?: string;
    userId: string;
    brand?: string;
    name?: string;
    version?: string;
    manufacturer?: string;
    model?: string;
    osName?: string;
    osVersion?: string;
    status?: '0' | '1';
    token?: string;
    fcmToken: string;
    sessionCode?: string;
    createdAt?: string;
    updatedAt?: string;
}
