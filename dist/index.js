var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-qr-code", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const reqs = ['qrious'];
    components_1.RequireJS.config({
        baseUrl: `${components_1.application.currentModuleDir}/lib`,
        paths: {
            'qrious': 'qrious.min.js'
        }
    });
    let ScomQRCode = class ScomQRCode extends components_1.Module {
        constructor() {
            super(...arguments);
            this._data = { text: '' };
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
            if (this.qrcode)
                this.qrcode.value = value;
        }
        set size(value) {
            this._data.size = value;
            if (this.qrcode)
                this.qrcode.size = value;
            if (this.imgQRCode) {
                this.imgQRCode.width = value;
                this.imgQRCode.height = value;
            }
        }
        set mime(value) {
            this._data.mime = value;
            if (this.qrcode)
                this.qrcode.mime = value;
        }
        set level(value) {
            this._data.level = value;
            if (this.qrcode)
                this.qrcode.level = value;
        }
        set qrCodeBackground(value) {
            this._data.qrCodeBackground = value;
            if (this.qrcode) {
                if (value.color)
                    this.qrcode.background = value.color;
                if (value.alpha)
                    this.qrcode.backgroundAlpha = value.alpha;
            }
        }
        set qrCodeForeground(value) {
            this._data.qrCodeForeground = value;
            if (this.qrcode) {
                if (value.color)
                    this.qrcode.foreground = value.color;
                if (value.alpha)
                    this.qrcode.foregroundAlpha = value.alpha;
            }
        }
        updateQRCode() {
            if (!this.qrcode)
                return;
            this.imgQRCode.url = this.text ? this.qrcode.toDataURL() : '';
        }
        async setData(value) {
            this._data.text = value.text;
            this.updateQRCode();
        }
        getData() {
            return this._data;
        }
        async loadLib() {
            return new Promise((resolve, reject) => {
                components_1.RequireJS.require(reqs, function (QRious) {
                    resolve(new QRious());
                });
            });
        }
        async init() {
            this.qrcode = await this.loadLib();
            await super.init();
            this.text = this.getAttribute('text', true, '');
            this.size = this.getAttribute('size', true, 256);
            const mime = this.getAttribute('mime', true);
            if (mime)
                this.mime = mime;
            this.level = this.getAttribute('level', true, 'L');
            const qrCodeBackground = this.getAttribute('qrCodeBackground', true);
            if (qrCodeBackground)
                this.qrCodeBackground = qrCodeBackground;
            const qrCodeForeground = this.getAttribute('qrCodeForeground', true);
            if (qrCodeForeground)
                this.qrCodeForeground = qrCodeForeground;
            if (this.text)
                this.updateQRCode();
        }
        render() {
            return (this.$render("i-panel", null,
                this.$render("i-image", { id: "imgQRCode", width: 256, height: 256 })));
        }
    };
    ScomQRCode = __decorate([
        (0, components_1.customElements)('i-scom-qr-code')
    ], ScomQRCode);
    exports.default = ScomQRCode;
});
