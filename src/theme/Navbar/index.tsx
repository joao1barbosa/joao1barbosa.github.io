import type {ReactNode} from 'react';
import clsx from 'clsx';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';
import styles from './styles.module.css';

/**
 * Navbar superior removida em todo o projeto. Mantemos apenas o drawer
 * (sidebar mobile nativa do Docusaurus) + backdrop, acionado pelo hambúrguer
 * do FloatingDock nas rotas /notebook e /blog. O <nav.navbar> serve só como
 * contexto de posicionamento (classe navbar-sidebar--show) e fica colapsado.
 */
export default function Navbar(): ReactNode {
  const sidebar = useNavbarMobileSidebar();
  return (
    <nav
      className={clsx('navbar', styles.shell, {
        'navbar-sidebar--show': sidebar.shown,
      })}
    >
      {sidebar.shown && (
        <div
          role="presentation"
          className="navbar-sidebar__backdrop"
          onClick={sidebar.toggle}
        />
      )}
      <NavbarMobileSidebar />
    </nav>
  );
}
