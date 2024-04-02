/// <amd-module name="@scom/scom-qr-code" />
declare module "@scom/scom-qr-code" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    type LevelType = 'L' | 'M' | 'Q' | 'H';
    interface ScomQRCodeElement extends ControlElement {
        text?: string;
        size?: number;
        level?: LevelType;
        qrCodeBackground?: string;
        qrCodeForeground?: string;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-qr-code"]: ScomQRCodeElement;
            }
        }
    }
    export default class ScomQRCode extends Module {
        private pnlQRCode;
        private qrcode;
        private _data;
        static create(options?: ScomQRCodeElement, parent?: Container): Promise<ScomQRCode>;
        get text(): string;
        set text(value: string);
        set size(value: number);
        set level(value: LevelType);
        set qrCodeBackground(value: string);
        set qrCodeForeground(value: string);
        updateQRCode(): void;
        private setData;
        private getData;
        private createNewQRCodeInstance;
        private loadLib;
        init(): Promise<void>;
        render(): any;
    }
}
