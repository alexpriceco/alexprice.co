import Head from 'next/head'

export const DocumentHead = (props) => (
  <Head>
    <meta charset='utf-8' />
    <title>{props.title || 'Alex Price, Digital Product Designer'}</title>
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta name='description' content='Alex Price, Digital Product Designer' />
    <meta property='og:site_name' content='Alex Price, Digital Product Deigner' />
    <meta property='og:title' content='Alex Price, Digital Product Deigner' />
    <meta property='og:image' content='https://alexprice.co/static/me.jpg' />
    <meta property='og:url' content='https://alexprice.co/' />
    <meta property='og:description' content='Digital product designer from Austin. Background in supply chain, fintech, energy, and electric vehicles. D&D on the weekends.' />

    <link rel='apple-touch-icon' sizes='180x180' href='/static/favicons/apple-touch-icon.png' />
    <link rel='icon' type='image/png' sizes='32x32' href='/static/favicons/favicon-32x32.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='/static/favicons/favicon-16x16.png' />
    <link rel='manifest' href='/static/favicons/manifest.json' />
    <link rel='mask-icon' href='/static/favicons/safari-pinned-tab.svg' color='#000000' />
    <link rel='shortcut icon' href='/static/favicons/favicon.ico' />
    <meta name='msapplication-config' content='/static/favicons/browserconfig.xml' />
    <meta name='theme-color' content='#ffffff' />
  </Head>
)

export default DocumentHead
