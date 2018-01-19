import Head from 'next/head'

export const DocumentHead = (props) => (
  <Head>
    <meta charset='utf-8' />
    <title>{props.title || 'Alex Price, Digital Product Designer'}</title>
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta name='description' content="I'm Alex Price, a Digital Product Designer looking for a job." />
    <meta property='og:site_name' content='Alex Price, Digital Product Deigner' />
    <meta property='og:title' content='Alex Price, Digital Product Deigner' />
    <meta property='og:image' content='https://alexprice.co/static/me.jpg' />
    <meta property='og:url' content='https://alexprice.co/' />
    <meta property='og:description' content='Digital product designer from ATX. Background in electric vehicles, robotics, and supply chain edtech. D&D on the weekends.' />

    <link rel='apple-touch-icon' sizes='57x57' href='static/favicon/apple-icon-57x57.png' />
    <link rel='apple-touch-icon' sizes='60x60' href='static/favicon/apple-icon-60x60.png' />
    <link rel='apple-touch-icon' sizes='72x72' href='static/favicon/apple-icon-72x72.png' />
    <link rel='apple-touch-icon' sizes='76x76' href='static/favicon/apple-icon-76x76.png' />
    <link rel='apple-touch-icon' sizes='114x114' href='static/favicon/apple-icon-114x114.png' />
    <link rel='apple-touch-icon' sizes='120x120' href='static/favicon/apple-icon-120x120.png' />
    <link rel='apple-touch-icon' sizes='144x144' href='static/favicon/apple-icon-144x144.png' />
    <link rel='apple-touch-icon' sizes='152x152' href='static/favicon/apple-icon-152x152.png' />
    <link rel='apple-touch-icon' sizes='180x180' href='static/favicon/apple-icon-180x180.png' />
    <link rel='icon' type='image/png' sizes='192x192' href='static/favicon/android-icon-192x192.png' />
    <link rel='icon' type='image/png' sizes='32x32' href='static/favicon/favicon-32x32.png' />
    <link rel='icon' type='image/png' sizes='96x96' href='static/favicon/favicon-96x96.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='static/favicon/favicon-16x16.png' />
    <link rel='manifest' href='static/favicon/manifest.json' />
    <meta name='msapplication-TileColor' content='#101010 ' />
    <meta name='msapplication-TileImage' content='static/favicon/ms-icon-144x144.png' />
    <meta name='theme-color' content='#101010 ' />
  </Head>
)

export default DocumentHead
