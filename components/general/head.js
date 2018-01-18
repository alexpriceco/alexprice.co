import Head from 'next/head'

export const DocumentHead = (props) => (
  <Head>
    <meta charset='utf-8' />
    <title>{props.title || 'Alex Price, Digital Product Designer'}</title>
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta name='description' content="I'm Alex Price, a Digital Product Designer looking for a job." />
    <meta property='og:site_name' content='Your Website Name Here' />
    <meta property='og:title' content='Alex Price, Digital Product Deigner' />
    <meta property='og:description' content='Compelling description of URL that is about 300 characters in length.' />
    <meta property='og:image' content='YOURIMAGEURLGOESHERE.JPG' />
    <meta property='og:url' content='http://yourcontentURLgoeshere.com/' />



    <link rel='apple-touch-icon' sizes='57x57' href='media/favicon/apple-icon-57x57.png' />
    <link rel='apple-touch-icon' sizes='60x60' href='media/favicon/apple-icon-60x60.png' />
    <link rel='apple-touch-icon' sizes='72x72' href='media/favicon/apple-icon-72x72.png' />
    <link rel='apple-touch-icon' sizes='76x76' href='media/favicon/apple-icon-76x76.png' />
    <link rel='apple-touch-icon' sizes='114x114' href='media/favicon/apple-icon-114x114.png' />
    <link rel='apple-touch-icon' sizes='120x120' href='media/favicon/apple-icon-120x120.png' />
    <link rel='apple-touch-icon' sizes='144x144' href='media/favicon/apple-icon-144x144.png' />
    <link rel='apple-touch-icon' sizes='152x152' href='media/favicon/apple-icon-152x152.png' />
    <link rel='apple-touch-icon' sizes='180x180' href='media/favicon/apple-icon-180x180.png' />
    <link rel='icon' type='image/png' sizes='192x192' href='media/favicon/android-icon-192x192.png' />
    <link rel='icon' type='image/png' sizes='32x32' href='media/favicon/favicon-32x32.png' />
    <link rel='icon' type='image/png' sizes='96x96' href='media/favicon/favicon-96x96.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='media/favicon/favicon-16x16.png' />
    <link rel='manifest' href='media/favicon/manifest.json' />
    <meta name='msapplication-TileColor' content='#101010 ' />
    <meta name='msapplication-TileImage' content='media/favicon/ms-icon-144x144.png' />
    <meta name='theme-color' content='#101010 ' />
  </Head>
)

export default DocumentHead
