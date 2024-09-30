/// <amd-module name="@scom/scom-qr-code/model.ts" />
declare module "@scom/scom-qr-code/model.ts" {
    import { Module } from '@ijstech/components';
    export interface IImageOptions {
        url: string;
        margin?: number;
    }
    export interface IQRCode {
        text: string;
        image?: IImageOptions;
        size?: number;
        qrCodeBackground?: string;
        qrCodeColor?: string;
        downloadName?: string;
        isDownloadShown?: boolean;
    }
    export class Model {
        private _data;
        private module;
        get text(): string;
        set text(value: string);
        get image(): IImageOptions;
        set image(value: IImageOptions);
        get size(): number;
        set size(value: number);
        set qrCodeBackground(value: string);
        set qrCodeColor(value: string);
        get downloadName(): string;
        set downloadName(value: string);
        get isDownloadShown(): boolean;
        set isDownloadShown(value: boolean);
        get qrCodeOptions(): any;
        constructor(module: Module);
        loadLib(): Promise<unknown>;
        getConfigurators(): {
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        }[];
        setData(value: any): Promise<void>;
        getData(): IQRCode;
        getTag(): any;
        setTag(value: any): void;
        private updateTag;
        private updateStyle;
        private updateTheme;
        private _getActions;
    }
}
/// <amd-module name="@scom/scom-qr-code" />
declare module "@scom/scom-qr-code" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    import { IImageOptions, IQRCode } from "@scom/scom-qr-code/model.ts";
    export { IQRCode, IImageOptions };
    interface ScomQRCodeElement extends ControlElement {
        text?: string;
        image?: IImageOptions;
        size?: number;
        qrCodeBackground?: string;
        qrCodeColor?: string;
        downloadName?: string;
        isDownloadShown?: boolean;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-qr-code"]: ScomQRCodeElement;
            }
        }
    }
    export default class ScomQRCode extends Module {
        private model;
        private pnlQRCode;
        private btnDownload;
        private qrCode;
        static create(options?: ScomQRCodeElement, parent?: Container): Promise<ScomQRCode>;
        get text(): string;
        set text(value: string);
        get image(): IImageOptions;
        set image(value: IImageOptions);
        set size(value: number);
        set qrCodeBackground(value: string);
        set qrCodeColor(value: string);
        get downloadName(): string;
        set downloadName(value: string);
        get isDownloadShown(): boolean;
        set isDownloadShown(value: boolean);
        getConfigurators(): {
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        }[];
        setData(value: IQRCode): Promise<void>;
        getData(): IQRCode;
        getTag(): any;
        setTag(value: any): void;
        updateQRCode(): Promise<void>;
        private onDownload;
        private initModel;
        init(): Promise<void>;
        render(): any;
    }
}
