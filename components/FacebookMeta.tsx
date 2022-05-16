import React from 'react';

export interface FacebookMetaProps {
  name: string;
  title: string;
  description: string;
}

export default function FacebookMeta({
  name,
  title,
  description,
}: FacebookMetaProps) {
  return (
    <>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      <meta property="og:url" content="https://wordful.app/" />
      <meta
        property="og:image"
        content="https://wordful.app/apple-touch-icon.png"
      />
    </>
  );
}
