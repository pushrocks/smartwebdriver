/// <reference types="webdriverio" />
import { Client } from 'webdriverio';
export declare type TProvider = 'local' | 'sauce';
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
    constructor(optionsArg: ISmartdriverOptions);
    getLocalClient(): Client<void>;
    installLocal(): Promise<{}>;
    /**
     * Starts the SmartWebdriver instance
     */
    startLocal(): Promise<{}>;
    /**
     * stops the SmartWebdriver instance
     */
    stopLocal(): Promise<void>;
}
