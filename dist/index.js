var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-qr-code/model.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    const reqs = ['qrcode'];
    const baseLibUrl = `${components_1.application.currentModuleDir}/lib`;
    class Model {
        get text() {
            return this._data.text;
        }
        set text(value) {
            this._data.text = value;
        }
        get image() {
            return this._data.image;
        }
        set image(value) {
            this._data.image = value;
        }
        set size(value) {
            this._data.size = value;
        }
        set qrCodeBackground(value) {
            this._data.qrCodeBackground = value;
        }
        set qrCodeColor(value) {
            this._data.qrCodeColor = value;
        }
        get downloadName() {
            return this._data.downloadName;
        }
        set downloadName(value) {
            this._data.downloadName = value;
        }
        get isDownloadShown() {
            return this._data.isDownloadShown;
        }
        set isDownloadShown(value) {
            this._data.isDownloadShown = value;
        }
        get qrCodeOptions() {
            if (!window.QRCodeStyling || !this.text)
                return null;
            const size = this._data.size || 256;
            const options = {
                width: size,
                height: size,
                data: this.text
            };
            if (this.image?.url) {
                const { url, margin } = this.image;
                options.image = url;
                options.imageOptions = {
                    crossOrigin: 'anonymous',
                    margin: margin || 0
                };
            }
            if (this._data.qrCodeColor) {
                options.dotsOptions = {
                    color: this._data.qrCodeColor,
                    type: 'rounded'
                };
            }
            if (this._data.qrCodeBackground) {
                options.backgroundOptions = {
                    color: this._data.qrCodeBackground
                };
            }
            if (this._data.downloadName) {
                options.backgroundOptions = {
                    name: this._data.downloadName
                };
            }
            return options;
        }
        constructor(module) {
            this._data = { text: '', size: 256 };
            this.module = module;
        }
        async loadLib() {
            if (window.QRCodeStyling)
                return;
            return new Promise((resolve, reject) => {
                try {
                    components_1.RequireJS.config({
                        baseUrl: baseLibUrl,
                        paths: {
                            'qrcode': 'qr-code-styling.js'
                        }
                    });
                    components_1.RequireJS.require(reqs, function (QRCode) {
                        window.QRCodeStyling = QRCode;
                        resolve(QRCode);
                    });
                }
                catch (err) {
                    console.log(err);
                }
            });
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
            ];
        }
        async setData(value) {
            this._data = value;
        }
        getData() {
            return this._data;
        }
        getTag() {
            return this.module.tag;
        }
        setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    if (prop === 'light' || prop === 'dark')
                        this.updateTag(prop, newValue[prop]);
                    else
                        this.module.tag[prop] = newValue[prop];
                }
            }
            this.updateTheme();
        }
        updateTag(type, value) {
            this.module.tag[type] = this.module.tag[type] ?? {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this.module.tag[type][prop] = value[prop];
            }
        }
        updateStyle(name, value) {
            if (value) {
                this.module.style.setProperty(name, value);
            }
            else {
                this.module.style.removeProperty(name);
            }
        }
        updateTheme() {
            const themeVar = document.body.style.getPropertyValue('--theme') || 'light';
            this.updateStyle('--text-primary', this.module.tag[themeVar]?.fontColor);
            this.updateStyle('--text-secondary', this.module.tag[themeVar]?.secondaryColor);
            this.updateStyle('--background-main', this.module.tag[themeVar]?.backgroundColor);
            this.updateStyle('--colors-primary-main', this.module.tag[themeVar]?.primaryColor);
            this.updateStyle('--colors-primary-light', this.module.tag[themeVar]?.primaryLightColor);
            this.updateStyle('--colors-primary-dark', this.module.tag[themeVar]?.primaryDarkColor);
            this.updateStyle('--colors-secondary-light', this.module.tag[themeVar]?.secondaryLight);
            this.updateStyle('--colors-secondary-main', this.module.tag[themeVar]?.secondaryMain);
            this.updateStyle('--divider', this.module.tag[themeVar]?.borderColor);
            this.updateStyle('--action-selected', this.module.tag[themeVar]?.selected);
            this.updateStyle('--action-selected_background', this.module.tag[themeVar]?.selectedBackground);
            this.updateStyle('--action-hover_background', this.module.tag[themeVar]?.hoverBackground);
            this.updateStyle('--action-hover', this.module.tag[themeVar]?.hover);
        }
        _getActions() {
            const actions = [];
            return actions;
        }
    }
    exports.Model = Model;
});
define("@scom/scom-qr-code", ["require", "exports", "@ijstech/components", "@scom/scom-qr-code/model.ts"], function (require, exports, components_2, model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ScomQRCode = class ScomQRCode extends components_2.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get text() {
            return this.model.text;
        }
        set text(value) {
            this.model.text = value;
        }
        get image() {
            return this.model.image;
        }
        set image(value) {
            this.model.image = value;
        }
        set size(value) {
            this.model.size = value;
        }
        set qrCodeBackground(value) {
            this.model.qrCodeBackground = value;
        }
        set qrCodeColor(value) {
            this.model.qrCodeColor = value;
        }
        get downloadName() {
            return this.model.downloadName;
        }
        set downloadName(value) {
            this.model.downloadName = value;
        }
        get isDownloadShown() {
            return this.model.isDownloadShown;
        }
        set isDownloadShown(value) {
            this.model.isDownloadShown = value;
        }
        getConfigurators() {
            this.initModel();
            return this.model.getConfigurators();
        }
        async setData(value) {
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
        setTag(value) {
            this.model.setTag(value);
        }
        async updateQRCode() {
            await this.model.loadLib();
            const options = this.model.qrCodeOptions;
            this.pnlQRCode.clearInnerHTML();
            this.qrCode = new window.QRCodeStyling({ ...options });
            this.qrCode.append(this.pnlQRCode);
            this.btnDownload.visible = this.isDownloadShown;
        }
        onDownload() {
            if (!this.isDownloadShown || !this.qrCode)
                return;
            this.qrCode.download({ name: this.downloadName || 'qr' });
        }
        initModel() {
            if (!this.model) {
                this.model = new model_1.Model(this);
            }
        }
        async init() {
            this.initModel();
            await this.model.loadLib();
            super.init();
            const text = this.getAttribute('text', true);
            if (text)
                this.text = text;
            const image = this.getAttribute('image', true);
            if (image)
                this.image = image;
            const size = this.getAttribute('size', true);
            if (size)
                this.size = size;
            const qrCodeBackground = this.getAttribute('qrCodeBackground', true);
            if (qrCodeBackground)
                this.qrCodeBackground = qrCodeBackground;
            const qrCodeColor = this.getAttribute('qrCodeColor', true);
            if (qrCodeColor)
                this.qrCodeColor = qrCodeColor;
            const downloadName = this.getAttribute('downloadName', true);
            if (downloadName)
                this.downloadName = downloadName;
            const isDownloadShown = this.getAttribute('isDownloadShown', true);
            if (isDownloadShown)
                this.isDownloadShown = isDownloadShown;
            this.updateQRCode();
        }
        render() {
            return (this.$render("i-stack", { alignItems: "center", direction: "vertical" },
                this.$render("i-panel", { id: "pnlQRCode" }),
                this.$render("i-button", { id: "btnDownload", visible: false, caption: "Download", font: { bold: true }, width: 180, margin: { top: '1rem' }, padding: { left: '0.5rem', right: '0.5rem', top: '0.5rem', bottom: '0.5rem' }, onClick: this.onDownload.bind(this) })));
        }
    };
    ScomQRCode = __decorate([
        (0, components_2.customElements)('i-scom-qr-code')
    ], ScomQRCode);
    exports.default = ScomQRCode;
});
