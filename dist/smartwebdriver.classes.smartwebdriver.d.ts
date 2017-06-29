export declare class SmartWebdriver {
    childProcess: any;
    private _installed;
    constructor();
    install(): Promise<{}>;
    start(): Promise<{}>;
    stop(): Promise<void>;
}
