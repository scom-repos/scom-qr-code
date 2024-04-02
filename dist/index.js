var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-qr-code", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const reqs = ['qrcode'];
    components_1.RequireJS.config({
        baseUrl: `${components_1.application.currentModuleDir}/lib`,
        paths: {
            'qrcode': 'qrcode.min.js'
        }
    });
    let ScomQRCode = class ScomQRCode extends components_1.Module {
        constructor() {
            super(...arguments);
            this._data = { text: '', level: 'L', size: 256 };
            this.tag = {
                light: {},
                dark: {}
            };
            this._theme = 'light';
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get text() {
            return this._data.text;
        }
        set text(value) {
            this._data.text = value;
        }
        set size(value) {
            this._data.size = value;
        }
        set level(value) {
            this._data.level = value;
        }
        set qrCodeBackground(value) {
            this._data.qrCodeBackground = value;
        }
        set qrCodeForeground(value) {
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
            ];
        }
        async setData(value) {
            this._data.text = value.text;
            this.updateQRCode();
        }
        getData() {
            return this._data;
        }
        _getActions() {
            const actions = [];
            return actions;
        }
        getTag() {
            return this.tag;
        }
        setTag(value) {
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
        updateTag(type, value) {
            this.tag[type] = this.tag[type] ?? {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this.tag[type][prop] = value[prop];
            }
        }
        updateStyle(name, value) {
            value ?
                this.style.setProperty(name, value) :
                this.style.removeProperty(name);
        }
        updateTheme() {
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
        createNewQRCodeInstance() {
            if (!window.QRCode)
                return;
            this.pnlQRCode.clearInnerHTML();
            if (!this.text)
                return;
            const options = {
                width: this._data.size,
                height: this._data.size,
                text: this.text
            };
            if (this._data.qrCodeForeground)
                options.colorDark = this._data.qrCodeForeground;
            if (this._data.qrCodeForeground)
                options.colorLight = this._data.qrCodeBackground;
            if (this._data.level)
                options.correctLevel = window.QRCode.CorrectLevel[this._data.level];
            return new window.QRCode(this.pnlQRCode, options);
        }
        async loadLib() {
            return new Promise((resolve, reject) => {
                try {
                    let self = this;
                    components_1.RequireJS.require(reqs, function (QRCode) {
                        let qrcode = self.createNewQRCodeInstance();
                        resolve(qrcode);
                    });
                }
                catch (err) {
                    console.log(err);
                }
            });
        }
        async init() {
            await super.init();
            const text = this.getAttribute('text', true);
            if (text)
                this.text = text;
            const size = this.getAttribute('size', true);
            if (size)
                this.size = size;
            const level = this.getAttribute('level', true);
            if (level)
                this.level = level;
            const qrCodeBackground = this.getAttribute('qrCodeBackground', true);
            if (qrCodeBackground)
                this.qrCodeBackground = qrCodeBackground;
            const qrCodeForeground = this.getAttribute('qrCodeForeground', true);
            if (qrCodeForeground)
                this.qrCodeForeground = qrCodeForeground;
            await this.loadLib();
        }
        render() {
            return (this.$render("i-panel", null,
                this.$render("i-panel", { id: "pnlQRCode" })));
        }
    };
    ScomQRCode = __decorate([
        (0, components_1.customElements)('i-scom-qr-code')
    ], ScomQRCode);
    exports.default = ScomQRCode;
});
