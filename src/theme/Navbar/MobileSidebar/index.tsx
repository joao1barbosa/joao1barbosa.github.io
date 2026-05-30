import type {ReactNode} from 'react';
import {
  useLockBodyScroll,
  useNavbarMobileSidebar,
  useNavbarSecondaryMenu,
} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import IconClose from '@theme/Icon/Close';

/**
 * Drawer mobile simplificado: mostra APENAS o sumário da página (sidebar do
 * notebook/blog) + botão de fechar. Removidos os extras padrão do Docusaurus
 * (logo, toggle de tema, links de navbar, "voltar ao menu") — já acessíveis
 * pelo dock flutuante.
 */
export default function NavbarMobileSidebar(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const secondaryMenu = useNavbarSecondaryMenu();
  useLockBodyScroll(mobileSidebar.shown);

  if (!mobileSidebar.shouldRender) {
    return null;
  }

  return (
    <div className="navbar-sidebar">
      <div className="navbar-sidebar__brand">
        <button
          type="button"
          className="clean-btn navbar-sidebar__close"
          aria-label={translate({
            id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
            message: 'Close navigation bar',
            description: 'The ARIA label for close button of mobile sidebar',
          })}
          onClick={() => mobileSidebar.toggle()}
        >
          <IconClose color="var(--ifm-color-emphasis-600)" />
        </button>
      </div>
      <div className="navbar-sidebar__items">
        <div className="navbar-sidebar__item menu">{secondaryMenu.content}</div>
      </div>
    </div>
  );
}
