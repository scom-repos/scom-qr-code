import { application, Module, RequireJS } from '@ijstech/components';
declare const window: any;

const reqs = ['qrcode'];
const baseLibUrl = `${application.currentModuleDir}/lib`;
const SIZE = 256;

export interface IImageOptions {
  url: string,
  margin?: number
}

export interface IQRCode {
  text: string;
  image?: IImageOptions;
  size?: number;
  qrCodeBackground?: string;
  qrCodeColor?: string;
  downloadName?: string;
  isDownloadShown?: boolean;
}

export class Model {
  private _data: IQRCode = { text: '', size: SIZE };
  private module: Module;

  get text() {
    return this._data.text;
  }

  set text(value: string) {
    this._data.text = value;
  }

  get image() {
    return this._data.image;
  }

  set image(value: IImageOptions) {
    this._data.image = value;
  }

  get size() {
    return this._data.size || SIZE;
  }

  set size(value: number) {
    this._data.size = value;
  }

  set qrCodeBackground(value: string) {
    this._data.qrCodeBackground = value;
  }

  set qrCodeColor(value: string) {
    this._data.qrCodeColor = value;
  }

  get downloadName() {
    return this._data.downloadName;
  }

  set downloadName(value: string) {
    this._data.downloadName = value;
  }

  get isDownloadShown() {
    return this._data.isDownloadShown;
  }

  set isDownloadShown(value: boolean) {
    this._data.isDownloadShown = value;
  }

  get qrCodeOptions() {
    if (!window.QRCodeStyling || !this.text) return null;
    const size = this.size;
    const options: any = {
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
      }
    }
    if (this._data.qrCodeColor) {
      options.dotsOptions = {
        color: this._data.qrCodeColor,
        type: 'rounded'
      }
    }
    if (this._data.qrCodeBackground) {
      options.backgroundOptions = {
        color: this._data.qrCodeBackground
      }
    }
    if (this._data.downloadName) {
      options.backgroundOptions = {
        name: this._data.downloadName
      }
    }
    return options;
  }

  constructor(module: Module) {
    this.module = module;
  }

  async loadLib() {
    if (window.QRCodeStyling) return;
    return new Promise((resolve, reject) => {
      try {
        RequireJS.config({
          baseUrl: baseLibUrl,
          paths: {
            'qrcode': 'qr-code-styling.js'
          }
        });
        RequireJS.require(reqs, function (QRCode: any) {
          window.QRCodeStyling = QRCode;
          resolve(QRCode);
        });
      } catch (err) {
        console.log(err)
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
    ]
  }

  async setData(value: any) {
    this._data = value;
  }

  getData() {
    return this._data;
  }

  getTag() {
    return this.module.tag;
  }

  setTag(value: any) {
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

  private updateTag(type: 'light' | 'dark', value: any) {
    this.module.tag[type] = this.module.tag[type] ?? {};
    for (let prop in value) {
      if (value.hasOwnProperty(prop))
        this.module.tag[type][prop] = value[prop];
    }
  }

  private updateStyle(name: string, value: any) {
    if (value) {
      this.module.style.setProperty(name, value);
    } else {
      this.module.style.removeProperty(name);
    }
  }

  private updateTheme() {
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

  private _getActions() {
    const actions = [];
    return actions;
  }
}
