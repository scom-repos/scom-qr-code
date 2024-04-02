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

interface ScomQRCodeElement extends ControlElement {
    text?: string;
    size?: number;
    level?: LevelType;
    qrCodeBackground?: string;
    qrCodeForeground?: string;
}

interface IQRCode {
    text: string;
    size?: number;
    level?: LevelType;
    qrCodeBackground?: string;
    qrCodeForeground?: string;
}

const reqs = ['qrcode'];
RequireJS.config({
    baseUrl: `${application.currentModuleDir}/lib`,
    paths: {
        'qrcode': 'qrcode.min.js'
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
    private pnlQRCode: Panel;
    private _data: IQRCode = { text: '', level: 'L', size: 256 };

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
    }

    set size(value: number) {
        this._data.size = value;
    }

    set level(value: LevelType) {
        this._data.level = value;
    }

    set qrCodeBackground(value: string) {
        this._data.qrCodeBackground = value;
    }

    set qrCodeForeground(value: string) {
        this._data.qrCodeForeground = value;
    }

    updateQRCode() {
        this.createNewQRCodeInstance();
    }

    private async setData(value: { text: string }) {
        this._data.text = value.text;
        this.updateQRCode();
    }

    private getData() {
        return this._data;
    }

    private createNewQRCodeInstance() {
        if (!(window as any).QRCode) return;
        this.pnlQRCode.clearInnerHTML();
        const options: any = {
            width: this._data.size,
            height: this._data.size
        };
        if (this.text)
            options.text = this.text;
        if (this._data.qrCodeForeground)
            options.colorDark = this._data.qrCodeForeground;
        if (this._data.qrCodeForeground)
            options.colorLight = this._data.qrCodeBackground;
        if (this._data.level)
            options.correctLevel = (window as any).QRCode.CorrectLevel[this._data.level];
        return new (window as any).QRCode(this.pnlQRCode, options);
    }

    private async loadLib() {
        return new Promise((resolve, reject) => {
            try {
                let self = this;
                RequireJS.require(reqs, function (QRCode: any) {
                    let qrcode = self.createNewQRCodeInstance();
                    resolve(qrcode);
                });
            } catch (err) {
                console.log(err)
            }
        });
    }

    async init() {
        await super.init();
        const text = this.getAttribute('text', true);
        if (text) this.text = text;
        const size = this.getAttribute('size', true);
        if (size) this.size = size;
        const level = this.getAttribute('level', true);
        if (level) this.level = level;
        const qrCodeBackground = this.getAttribute('qrCodeBackground', true);
        if (qrCodeBackground) this.qrCodeBackground = qrCodeBackground;
        const qrCodeForeground = this.getAttribute('qrCodeForeground', true);
        if (qrCodeForeground) this.qrCodeForeground = qrCodeForeground;
        await this.loadLib();
    }

    render() {
        return (
            <i-panel>
                <i-panel id="pnlQRCode"></i-panel>
            </i-panel>
        )
    }
}