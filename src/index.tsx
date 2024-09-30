import {
    Module,
    Container,
    ControlElement,
    customElements,
    Panel,
    Button
} from '@ijstech/components';
import { IImageOptions, IQRCode, Model } from './model';
export { IQRCode, IImageOptions };
declare const window: any;

interface ScomQRCodeElement extends ControlElement {
    text?: string;
    image?: IImageOptions;
    size?: number;
    qrCodeBackground?: string;
    qrCodeColor?: string;
    downloadName?: string;
    isDownloadShown?: boolean;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["i-scom-qr-code"]: ScomQRCodeElement;
        }
    }
}

@customElements('i-scom-qr-code')
export default class ScomQRCode extends Module {
    private model: Model;
    private pnlQRCode: Panel;
    private btnDownload: Button;
    private qrCode: any;

    static async create(options?: ScomQRCodeElement, parent?: Container) {
        let self = new this(parent, options);
        await self.ready();
        return self;
    }

    get text() {
        return this.model.text;
    }

    set text(value: string) {
        this.model.text = value;
    }

    get image() {
        return this.model.image;
    }

    set image(value: IImageOptions) {
        this.model.image = value;
    }

    set size(value: number) {
        this.model.size = value;
    }

    set qrCodeBackground(value: string) {
        this.model.qrCodeBackground = value;
    }

    set qrCodeColor(value: string) {
        this.model.qrCodeColor = value;
    }

    get downloadName() {
        return this.model.downloadName;
    }

    set downloadName(value: string) {
        this.model.downloadName = value;
    }

    get isDownloadShown() {
        return this.model.isDownloadShown;
    }

    set isDownloadShown(value: boolean) {
        this.model.isDownloadShown = value;
    }

    getConfigurators() {
        this.initModel();
        return this.model.getConfigurators();
    }

    async setData(value: IQRCode) {
        this.initModel();
        await this.model.setData(value);
        this.updateQRCode();
    }

    getData() {
        return this.model.getData();
    }

    getTag() {
        return this.tag;
    }

    setTag(value: any) {
        this.model.setTag(value);
    }

    async updateQRCode() {
        await this.model.loadLib();
        const options = this.model.qrCodeOptions;
        if (!options) return;
        this.pnlQRCode.clearInnerHTML();
        this.qrCode = new window.QRCodeStyling({ ...options });
        this.qrCode.append(this.pnlQRCode);
        this.btnDownload.width = this.model.size > 180 ? this.model.size : 180;
        this.btnDownload.visible = this.isDownloadShown;
    }

    private onDownload() {
        if (!this.isDownloadShown || !this.qrCode) return;
        this.qrCode.download({ name: this.downloadName || 'qr' });
    }

    private initModel() {
        if (!this.model) {
            this.model = new Model(this);
        }
    }

    async init() {
        this.initModel();
        await this.model.loadLib();
        super.init();
        const text = this.getAttribute('text', true);
        if (text) this.text = text;
        const image = this.getAttribute('image', true);
        if (image) this.image = image;
        const size = this.getAttribute('size', true);
        if (size) this.size = size;
        const qrCodeBackground = this.getAttribute('qrCodeBackground', true);
        if (qrCodeBackground) this.qrCodeBackground = qrCodeBackground;
        const qrCodeColor = this.getAttribute('qrCodeColor', true);
        if (qrCodeColor) this.qrCodeColor = qrCodeColor;
        const downloadName = this.getAttribute('downloadName', true);
        if (downloadName) this.downloadName = downloadName;
        const isDownloadShown = this.getAttribute('isDownloadShown', true);
        if (isDownloadShown) this.isDownloadShown = isDownloadShown;
        this.updateQRCode();
    }

    render() {
        return (
            <i-stack alignItems="center" direction="vertical">
                <i-panel id="pnlQRCode" />
                <i-button
                    id="btnDownload"
                    visible={false}
                    caption="Download"
                    font={{ bold: true }}
                    width={180}
                    maxWidth="100%"
                    margin={{ top: '2rem' }}
                    padding={{ left: '0.5rem', right: '0.5rem', top: '0.5rem', bottom: '0.5rem' }}
                    onClick={this.onDownload.bind(this)}
                />
            </i-stack>
        )
    }
}