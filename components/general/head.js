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

    <link rel='apple-touch-icon-precomposed' sizes='57x57' href='/static/favicons/apple-touch-icon-57x57.png' />
    <link rel='apple-touch-icon-precomposed' sizes='114x114' href='/static/favicons/apple-touch-icon-114x114.png' />
    <link rel='apple-touch-icon-precomposed' sizes='72x72' href='/static/favicons/apple-touch-icon-72x72.png' />
    <link rel='apple-touch-icon-precomposed' sizes='144x144' href='/static/favicons/apple-touch-icon-144x144.png' />
    <link rel='apple-touch-icon-precomposed' sizes='60x60' href='/static/favicons/apple-touch-icon-60x60.png' />
    <link rel='apple-touch-icon-precomposed' sizes='120x120' href='/static/favicons/apple-touch-icon-120x120.png' />
    <link rel='apple-touch-icon-precomposed' sizes='76x76' href='/static/favicons/apple-touch-icon-76x76.png' />
    <link rel='apple-touch-icon-precomposed' sizes='152x152' href='/static/favicons/apple-touch-icon-152x152.png' />
    <link rel='icon' type='image/png' href='/static/favicons/favicon-196x196.png' sizes='196x196' />
    <link rel='icon' type='image/png' href='/static/favicons/favicon-96x96.png' sizes='96x96' />
    <link rel='icon' type='image/png' href='/static/favicons/favicon-32x32.png' sizes='32x32' />
    <link rel='icon' type='image/png' href='/static/favicons/favicon-16x16.png' sizes='16x16' />
    <link rel='icon' type='image/png' href='/static/favicons/favicon-128.png' sizes='128x128' />
    <meta name='application-name' content='Alex Price, Digital Product Designer' />
    <meta name='msapplication-TileColor' content='#000000' />
    <meta name='msapplication-TileImage' content='/static/favicons/mstile-144x144.png' />
    <meta name='msapplication-square70x70logo' content='/static/favicons/mstile-70x70.png' />
    <meta name='msapplication-square150x150logo' content='/static/favicons/mstile-150x150.png' />
    <meta name='msapplication-wide310x150logo' content='/static/favicons/mstile-310x150.png' />
    <meta name='msapplication-square310x310logo' content='/static/favicons/mstile-310x310.png' />

  </Head>
)

export default DocumentHead
