import Head from 'next/head';
import PropTypes from 'prop-types';

import Nav from './nav';

export function Container({ children, metaTags }) {
  return (
    <div>
      <Head>
        <title>{metaTags.title}</title>
        <meta name="title" content={metaTags.title} />
        <meta name="description" content={metaTags.description} />

        {/* Google */}
        {metaTags.shouldIndex ? (
          <>
            {' '}
            <meta name="robots" content="index,follow,noodp" />
            <meta name="googlebot" content="index,follow" />
          </>
        ) : (
          <>
            <meta name="robots" content="noindex" />
            <meta name="googlebot" content="noindex" />
          </>
        )}

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaTags.url} />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:image" content="https://soldev.app/banner.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="twitter:creator" content="@italoacasas" />
        <meta name="twitter:url" content={metaTags.url} />
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />
        <meta name="twitter:image" content="https://soldev.app/banner.png" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav>{children}</Nav>
    </div>
  );
}

Container.propTypes = {
  metaTags: PropTypes.object.isRequired
};
