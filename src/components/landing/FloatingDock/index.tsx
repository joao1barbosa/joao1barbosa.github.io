import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useColorMode} from '@docusaurus/theme-common';
import {
  Home,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mail,
  BookOpen,
  NotebookPen,
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
  return (
    <button
      type="button"
      className={styles.btn}
      data-tip={ui.dock.language[locale]}
      aria-label="Toggle language"
      onClick={toggle}
    >
      <span className={styles.mono}>{locale.toUpperCase()}</span>
    </button>
  );
}

/** Dock flutuante de navegação (fixo na base). Substitui a navbar na landing. */
export default function FloatingDock(): ReactNode {
  const {locale} = useLocale();
  const t = ui.dock;
  return (
    <nav className={styles.wrap} aria-label="Navegação rápida">
      <div className={styles.dock}>
        <button
          type="button"
          className={styles.btn}
          data-tip={t.home[locale]}
          aria-label="Back to top"
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <Home size={ICON} aria-hidden="true" />
        </button>
        <a className={styles.btn} href="#work" data-tip={t.work[locale]} aria-label="Work">
          <Briefcase size={ICON} aria-hidden="true" />
        </a>
        <a className={styles.btn} href="#projects" data-tip={t.projects[locale]} aria-label="Projects">
          <FolderGit2 size={ICON} aria-hidden="true" />
        </a>
        <a className={styles.btn} href="#education" data-tip={t.education[locale]} aria-label="Education">
          <GraduationCap size={ICON} aria-hidden="true" />
        </a>
        <a className={styles.btn} href="#contact" data-tip={t.contact[locale]} aria-label="Contact">
          <Mail size={ICON} aria-hidden="true" />
        </a>

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
