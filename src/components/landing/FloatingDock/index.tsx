import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useColorMode} from '@docusaurus/theme-common';
import {profile} from '@site/src/data/portfolio';
import {
  HomeIcon,
  ProjectsIcon,
  HighlightsIcon,
  BlogIcon,
  NotebookIcon,
  GithubIcon,
  LinkedinIcon,
  XIcon,
  SunIcon,
  MoonIcon,
} from './icons';
import styles from './styles.module.css';

function ThemeToggle(): ReactNode {
  const {colorMode, setColorMode} = useColorMode();
  return (
    <button
      type="button"
      className={styles.button}
      data-tooltip="Theme"
      aria-label="Toggle color theme"
      onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
    >
      {/* Ícone alternado via CSS ([data-theme]) para evitar hydration mismatch. */}
      <SunIcon className={styles.sun} />
      <MoonIcon className={styles.moon} />
    </button>
  );
}

/**
 * Dock flutuante de navegação (fixo na base, centralizado).
 * Reproduz o dock da landing page original com tooltips e toggle de tema
 * integrado ao color mode do Docusaurus.
 */
export default function FloatingDock(): ReactNode {
  return (
    <nav className={styles.dock} aria-label="Navegação rápida">
      <ul className={styles.list}>
        <li>
          <a className={styles.link} href="#hero" data-tooltip="Home">
            <HomeIcon className={styles.icon} />
          </a>
        </li>
        <li>
          <a className={styles.link} href="#projects" data-tooltip="Projects">
            <ProjectsIcon className={styles.icon} />
          </a>
        </li>
        <li>
          <a className={styles.link} href="#highlights" data-tooltip="Highlights">
            <HighlightsIcon className={styles.icon} />
          </a>
        </li>

        <li className={styles.separator} aria-hidden="true" />

        <li>
          <Link className={styles.link} to="/blog" data-tooltip="Blog">
            <BlogIcon className={styles.icon} />
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/notebook" data-tooltip="Notebook">
            <NotebookIcon className={styles.icon} />
          </Link>
        </li>
        <li>
          <a
            className={styles.link}
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            data-tooltip="GitHub"
          >
            <GithubIcon className={styles.iconBrand} />
          </a>
        </li>
        <li>
          <a
            className={styles.link}
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-tooltip="LinkedIn"
          >
            <LinkedinIcon className={styles.iconBrand} />
          </a>
        </li>
        <li>
          <a
            className={styles.link}
            href={profile.socials.x}
            target="_blank"
            rel="noopener noreferrer"
            data-tooltip="X (Twitter)"
          >
            <XIcon className={styles.iconBrand} />
          </a>
        </li>

        <li className={styles.separator} aria-hidden="true" />

        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}
