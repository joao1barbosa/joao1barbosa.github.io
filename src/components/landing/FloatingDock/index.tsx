import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {useColorMode} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {
  Home,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mail,
  BookOpen,
  NotebookPen,
  Menu,
  Sun,
  Moon,
} from 'lucide-react';
import {profile, ui} from '@site/src/data/portfolio';
import {GithubIcon, LinkedinIcon} from '../brand-icons';
import {useLocale} from '../locale';
import styles from './styles.module.css';

const ICON = 17;

function ThemeToggle(): ReactNode {
  const {colorMode, setColorMode} = useColorMode();
  const {locale} = useLocale();
  return (
    <button
      type="button"
      className={styles.btn}
      data-tip={ui.dock.theme[locale]}
      aria-label="Toggle color theme"
      onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
    >
      {/* Ícone alternado por CSS ([data-theme]) → hydration-safe. */}
      <Sun className={styles.sun} size={ICON} aria-hidden="true" />
      <Moon className={styles.moon} size={ICON} aria-hidden="true" />
    </button>
  );
}

function LangToggle(): ReactNode {
  const {locale, toggle} = useLocale();
  const {pathname} = useLocation();
  // Tradução só vale na landing. Fora dela o conteúdo é sempre inglês, então o
  // botão fica desabilitado e exibe "EN" (independente do idioma salvo).
  const isHome = pathname === '/';
  const displayLocale = isHome ? locale : 'en';
  return (
    <button
      type="button"
      className={clsx(styles.btn, !isHome && styles.disabled)}
      data-tip={ui.dock.language[displayLocale]}
      aria-label="Toggle language"
      disabled={!isHome}
      onClick={toggle}
    >
      <span className={styles.mono}>{displayLocale.toUpperCase()}</span>
    </button>
  );
}

/** Hambúrguer que abre a sidebar nativa do Docusaurus (notebook/blog, mobile). */
function MobileSidebarToggle(): ReactNode {
  const sidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      className={clsx(styles.btn, styles.burger)}
      aria-label="Open sidebar"
      onClick={sidebar.toggle}
    >
      <Menu size={ICON} aria-hidden="true" />
    </button>
  );
}

/** Dock flutuante de navegação (fixo na base). Substitui a navbar. */
export default function FloatingDock(): ReactNode {
  const {locale} = useLocale();
  const {pathname} = useLocation();
  const t = ui.dock;
  // Hambúrguer só nas rotas com sidebar (notebook/blog); CSS limita a mobile.
  const showBurger =
    pathname.startsWith('/notebook') || pathname.startsWith('/blog');

  return (
    <nav className={styles.wrap} aria-label="Navegação rápida">
      <div className={styles.dock}>
        {showBurger && <MobileSidebarToggle />}

        {/* Links âncora apontam para a home ("/#secao") → funcionam em qualquer
            página: na landing rolam suavemente, fora dela navegam até a home. */}
        <Link className={styles.btn} to="/" data-tip={t.home[locale]} aria-label="Home">
          <Home size={ICON} aria-hidden="true" />
        </Link>
        {/* Botões de seção: escondidos no mobile (.sectionBtn). */}
        <Link
          className={clsx(styles.btn, styles.sectionBtn)}
          to="/#work"
          data-tip={t.work[locale]}
          aria-label="Work"
        >
          <Briefcase size={ICON} aria-hidden="true" />
        </Link>
        <Link
          className={clsx(styles.btn, styles.sectionBtn)}
          to="/#projects"
          data-tip={t.projects[locale]}
          aria-label="Projects"
        >
          <FolderGit2 size={ICON} aria-hidden="true" />
        </Link>
        <Link
          className={clsx(styles.btn, styles.sectionBtn)}
          to="/#education"
          data-tip={t.education[locale]}
          aria-label="Education"
        >
          <GraduationCap size={ICON} aria-hidden="true" />
        </Link>
        <Link
          className={clsx(styles.btn, styles.sectionBtn)}
          to="/#contact"
          data-tip={t.contact[locale]}
          aria-label="Contact"
        >
          <Mail size={ICON} aria-hidden="true" />
        </Link>

        <span className={styles.sep} aria-hidden="true" />

        <Link className={styles.btn} to="/blog" data-tip={t.blog[locale]} aria-label="Blog">
          <BookOpen size={ICON} aria-hidden="true" />
        </Link>
        <Link className={styles.btn} to="/notebook" data-tip={t.notebook[locale]} aria-label="Notebook">
          <NotebookPen size={ICON} aria-hidden="true" />
        </Link>
        <a
          className={styles.btn}
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          data-tip="GitHub"
          aria-label="GitHub"
        >
          <GithubIcon size={ICON} />
        </a>
        <a
          className={styles.btn}
          href={profile.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-tip="LinkedIn"
          aria-label="LinkedIn"
        >
          <LinkedinIcon size={ICON} />
        </a>

        <span className={styles.sep} aria-hidden="true" />

        <LangToggle />
        <ThemeToggle />
      </div>
    </nav>
  );
}
