import { Module, customModule, Container, Styles } from '@ijstech/components';
import assets from '@modules/assets';
import ScomQRCode from '@scom/scom-qr-code';

Styles.Theme.darkTheme.text.primary = '#fff';
Styles.Theme.darkTheme.text.secondary = '#fff';
Styles.Theme.darkTheme.background.modal = '#1A1A1A';
Styles.Theme.darkTheme.input.background = '#232B5A';
Styles.Theme.darkTheme.input.fontColor = '#fff';
Styles.Theme.darkTheme.action.active = 'rgba(255,255,255, 0.16)'
Styles.Theme.applyTheme(Styles.Theme.darkTheme);

@customModule
export default class Module1 extends Module {
    private scomQRCode: ScomQRCode;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    init() {
        super.init();
        this.scomQRCode.setData({
            text: 'Testing',
            size: 128,
            qrCodeBackground: '#fff',
            qrCodeColor: '#fe5262'
        });
    }

    render() {
        return (
            <i-hstack padding={{ top: '1.25rem', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }} gap="1rem">
                <i-hstack gap="1rem">
                    <i-scom-qr-code id="scomQRCode" />
                    <i-scom-qr-code
                        text="lnbc2500u1pvjluezsp5zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zygspp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdq5xysxxatsyp3k7enxv4jsxqzpu9qrsgquk0rl77nj30yxdy8j9vdx85fkpmdla2087ne0xh8nhedh8w27kyke0lp53ut353s06fv3qfegext0eh0ymjpf39tuven09sam30g4vgpfna3rh"
                        image={{ url: assets.logo.header.mobile.light, margin: 2 }}
                        size={256}
                        qrCodeColor="#007abf"
                        isDownloadShown={true}
                    />
                </i-hstack>
            </i-hstack>
        )
    }
}