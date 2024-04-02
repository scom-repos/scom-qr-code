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
        async setData(value) {
            this._data.text = value.text;
            this.updateQRCode();
        }
        getData() {
            return this._data;
        }
        createNewQRCodeInstance() {
            if (!window.QRCode)
                return;
            this.pnlQRCode.clearInnerHTML();
            const options = {
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
