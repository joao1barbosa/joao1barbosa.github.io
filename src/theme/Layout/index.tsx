import type {ReactNode} from 'react';
import Layout from '@theme-original/Layout';
import type {Props} from '@theme/Layout';
import {LocaleProvider} from '@site/src/components/landing/locale';
import FloatingDock from '@site/src/components/landing/FloatingDock';

/**
 * Wrap do Layout: injeta o LocaleProvider + FloatingDock em TODAS as páginas.
 * Ficam dentro de {children} (logo, dentro do LayoutProvider) para que o dock
 * tenha acesso ao useColorMode do Docusaurus.
 */
export default function LayoutWrapper(props: Props): ReactNode {
  const {children, ...rest} = props;
  return (
    <Layout {...rest}>
      <LocaleProvider>
        {children}
        <FloatingDock />
      </LocaleProvider>
    </Layout>
  );
}
