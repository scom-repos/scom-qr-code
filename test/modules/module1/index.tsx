import { Module, customModule, Container } from '@ijstech/components';
import ScomQRCode from '@scom/scom-qr-code';

@customModule
export default class Module1 extends Module {
    private scomQRCode: ScomQRCode;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    init() {
        super.init();
        this.scomQRCode.text = 'Testing';
        this.scomQRCode.size = 128;
        this.scomQRCode.level = 'M';
        this.scomQRCode.qrCodeBackground = '#fff';
        this.scomQRCode.qrCodeForeground = '#fe5262';
        this.scomQRCode.updateQRCode();
    }

    render() {
        return (
            <i-hstack padding={{ top: '1.25rem', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }} gap="1rem">
                <i-hstack gap="1rem">
                    <i-scom-qr-code id="scomQRCode"></i-scom-qr-code>
                    <i-scom-qr-code
                        text="lnbc2500u1pvjluezsp5zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zygspp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdq5xysxxatsyp3k7enxv4jsxqzpu9qrsgquk0rl77nj30yxdy8j9vdx85fkpmdla2087ne0xh8nhedh8w27kyke0lp53ut353s06fv3qfegext0eh0ymjpf39tuven09sam30g4vgpfna3rh"
                        size={256}
                        level="L"
                        qrCodeBackground='#fff'
                        qrCodeForeground='#007abf'
                    ></i-scom-qr-code>
                </i-hstack>
            </i-hstack>
        )
    }
}