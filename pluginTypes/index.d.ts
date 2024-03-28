/// <amd-module name="@scom/scom-qr-code" />
declare module "@scom/scom-qr-code" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    type LevelType = 'L' | 'M' | 'Q' | 'H';
    interface IQRCodeBackground {
        color?: string;
        alpha?: number;
    }
    interface ScomQRCodeElement extends ControlElement {
        text?: string;
        size?: number;
        mime?: string;
        level?: LevelType;
        qrCodeBackground?: IQRCodeBackground;
        qrCodeForeground?: IQRCodeBackground;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-qr-code"]: ScomQRCodeElement;
            }
        }
    }
    export default class ScomQRCode extends Module {
        private imgQRCode;
        private qrcode;
        private _data;
        static create(options?: ScomQRCodeElement, parent?: Container): Promise<ScomQRCode>;
        get text(): string;
        set text(value: string);
        set size(value: number);
        set mime(value: string);
        set level(value: LevelType);
        set qrCodeBackground(value: IQRCodeBackground);
        set qrCodeForeground(value: IQRCodeBackground);
        updateQRCode(): void;
        private setData;
        private getData;
        private loadLib;
        init(): Promise<void>;
        render(): any;
    }
}
