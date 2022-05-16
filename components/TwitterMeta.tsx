import React from 'react';

interface TwitterMetaProps {
  description: string;
  title: string;
}

export default function TwitterMeta({ description, title }: TwitterMetaProps) {
  return (
    <>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content="https://wordful.app/" />
      <meta
        name="twitter:image"
        content="https://wordful.app/android-chrome-192x192.png"
      />
      <meta name="twitter:creator" content="@_ryanmacdonald_" />
    </>
  );
}
