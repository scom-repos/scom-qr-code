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
    tag: any = {
      light: {},
      dark: {}
    }
    private _theme: string = 'light';

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

    getConfigurators() {
        return [
            {
                name: 'Builder Configurator',
                target: 'Builders',
                getActions: () => {
                    return this._getActions();
                },
                getData: this.getData.bind(this),
                setData: this.setData.bind(this),
                getTag: this.getTag.bind(this),
                setTag: this.setTag.bind(this)
            }
        ]
    }

    private async setData(value: { text: string }) {
        this._data.text = value.text;
        this.updateQRCode();
    }

    private getData() {
        return this._data;
    }

    private _getActions() {
      const actions = []
      return actions
    }

    private getTag() {
        return this.tag;
    }

    private setTag(value: any) {
        const newValue = value || {};
        for (let prop in newValue) {
            if (newValue.hasOwnProperty(prop)) {
                if (prop === 'light' || prop === 'dark')
                    this.updateTag(prop, newValue[prop]);
                else
                    this.tag[prop] = newValue[prop];
            }
        }
        this.updateTheme();
    }

    private updateTag(type: 'light' | 'dark', value: any) {
        this.tag[type] = this.tag[type] ?? {};
        for (let prop in value) {
            if (value.hasOwnProperty(prop))
                this.tag[type][prop] = value[prop];
        }
    }

    private updateStyle(name: string, value: any) {
        value ?
            this.style.setProperty(name, value) :
            this.style.removeProperty(name);
    }

    private updateTheme() {
        const themeVar = document.body.style.getPropertyValue('--theme') || 'light';
        this.updateStyle('--text-primary', this.tag[themeVar]?.fontColor);
        this.updateStyle('--text-secondary', this.tag[themeVar]?.secondaryColor);
        this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
        this.updateStyle('--colors-primary-main', this.tag[themeVar]?.primaryColor);
        this.updateStyle('--colors-primary-light', this.tag[themeVar]?.primaryLightColor);
        this.updateStyle('--colors-primary-dark', this.tag[themeVar]?.primaryDarkColor);
        this.updateStyle('--colors-secondary-light', this.tag[themeVar]?.secondaryLight);
        this.updateStyle('--colors-secondary-main', this.tag[themeVar]?.secondaryMain);
        this.updateStyle('--divider', this.tag[themeVar]?.borderColor);
        this.updateStyle('--action-selected', this.tag[themeVar]?.selected);
        this.updateStyle('--action-selected_background', this.tag[themeVar]?.selectedBackground);
        this.updateStyle('--action-hover_background', this.tag[themeVar]?.hoverBackground);
        this.updateStyle('--action-hover', this.tag[themeVar]?.hover);
    }

    private createNewQRCodeInstance() {
        if (!(window as any).QRCode) return;
        this.pnlQRCode.clearInnerHTML();
        if (!this.text) return;
        const options: any = {
            width: this._data.size,
            height: this._data.size,
            text: this.text
        };
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