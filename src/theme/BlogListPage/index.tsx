import React, {type ReactNode} from 'react';
import BlogListPage from '@theme-original/BlogListPage';
import type BlogListPageType from '@theme/BlogListPage';
import type {WrapperProps} from '@docusaurus/types';
import {PageMetadata} from '@docusaurus/theme-common';

type Props = WrapperProps<typeof BlogListPageType>;

/**
 * Wrapper da index do blog só para dar a ela um og:image próprio.
 * Sem isso, `/blog` herda o og:image default do site (o card do portfólio),
 * fazendo o preview do link da home do blog ficar igual ao do portfólio.
 */
export default function BlogListPageWrapper(props: Props): ReactNode {
  return (
    <>
      <PageMetadata image="/img/og-blog.png" />
      <BlogListPage {...props} />
    </>
  );
}
