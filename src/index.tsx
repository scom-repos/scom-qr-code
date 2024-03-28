import {
    Module,
    Container,
    ControlElement,
    customElements,
    Styles,
    RequireJS,
    application,
    Panel,
    Image,
} from '@ijstech/components';

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

interface IQRCode {
    text: string;
    size?: number;
    mime?: string;
    level?: LevelType;
    qrCodeBackground?: IQRCodeBackground;
    qrCodeForeground?: IQRCodeBackground;
}

const reqs = ['qrious'];
RequireJS.config({
    baseUrl: `${application.currentModuleDir}/lib`,
    paths: {
        'qrious': 'qrious.min.js'
    }
})

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["i-scom-qr-code"]: ScomQRCodeElement;
        }
    }
}

@customElements('i-scom-qr-code')
export default class ScomQRCode extends Module {
    private imgQRCode: Image;
    private qrcode: any;
    private _data: IQRCode = { text: '' };

    static async create(options?: ScomQRCodeElement, parent?: Container) {
        let self = new this(parent, options);
        await self.ready();
        return self;
    }

    get text() {
        return this._data.text;
    }

    set text(value: string) {
        this._data.text = value;
        if (this.qrcode) this.qrcode.value = value;
    }

    set size(value: number) {
        this._data.size = value;
        if (this.qrcode) this.qrcode.size = value;
        if (this.imgQRCode) {
            this.imgQRCode.width = value;
            this.imgQRCode.height = value;
        }
    }

    set mime(value: string) {
        this._data.mime = value;
        if (this.qrcode) this.qrcode.mime = value;
    }

    set level(value: LevelType) {
        this._data.level = value;
        if (this.qrcode) this.qrcode.level = value;
    }

    set qrCodeBackground(value: IQRCodeBackground) {
        this._data.qrCodeBackground = value;
        if (this.qrcode) {
            if (value.color) this.qrcode.background = value.color;
            if (value.alpha) this.qrcode.backgroundAlpha = value.alpha;
        }
    }

    set qrCodeForeground(value: IQRCodeBackground) {
        this._data.qrCodeForeground = value;
        if (this.qrcode) {
            if (value.color) this.qrcode.foreground = value.color;
            if (value.alpha) this.qrcode.foregroundAlpha = value.alpha;
        }
    }

    updateQRCode() {
        if (!this.qrcode) return;
        this.imgQRCode.url = this.text ? this.qrcode.toDataURL() : '';
    }

    private async setData(value: { text: string }) {
        this._data.text = value.text;
        this.updateQRCode();
    }

    private getData() {
        return this._data;
    }

    private async loadLib() {
        return new Promise((resolve, reject) => {
            RequireJS.require(reqs, function (QRious: any) {
                resolve(new QRious());
            })
        });
    }

    async init() {
        this.qrcode = await this.loadLib();
        await super.init();
        this.text = this.getAttribute('text', true, '');
        this.size = this.getAttribute('size', true, 256);
        const mime = this.getAttribute('mime', true);
        if (mime) this.mime = mime;
        this.level = this.getAttribute('level', true, 'L');
        const qrCodeBackground = this.getAttribute('qrCodeBackground', true);
        if (qrCodeBackground) this.qrCodeBackground = qrCodeBackground;
        const qrCodeForeground = this.getAttribute('qrCodeForeground', true);
        if (qrCodeForeground) this.qrCodeForeground = qrCodeForeground;
        if (this.text) this.updateQRCode();
    }

    render() {
        return (
            <i-panel>
                <i-image id="imgQRCode" width={256} height={256}></i-image>
            </i-panel>
        )
    }
}