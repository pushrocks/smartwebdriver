/// <reference types="webdriverio" />
import { Client } from 'webdriverio';
export declare type TProvider = 'smart' | 'sauce';
export interface ISmartdriverOptions {
    provider: TProvider;
}
export declare class SmartWebdriver {
    private installed;
    childProcess: any;
    private _installed;
    /**
     * the constructor
     */
    constructor(optionsArg?: ISmartdriverOptions);
    getLocalClient(): Promise<{
        client: Client<void>;
    }>;
    private installSmart();
    /**
     * Starts the SmartWebdriver instance
     */
    private startSmart();
    /**
     * stops the SmartWebdriver instance
     */
    stopSmart(): Promise<void>;
}
