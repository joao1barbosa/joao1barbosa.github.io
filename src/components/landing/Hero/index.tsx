import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {Mail} from 'lucide-react';
import {profile, pills, config, ui} from '@site/src/data/portfolio';
import {GithubIcon, LinkedinIcon, XIcon} from '../brand-icons';
import {useLocale} from '../locale';
import styles from './styles.module.css';

export default function Hero(): ReactNode {
  const {locale} = useLocale();

  const company = profile.company.href ? (
    <a href={profile.company.href} target="_blank" rel="noopener noreferrer">
      <strong>{profile.company.name}</strong>
    </a>
  ) : (
    <strong>{profile.company.name}</strong>
  );

  const bio =
    locale === 'pt' ? (
      <>
        Construindo coisas que escalam. Atualmente construo aplicativos internos
        e uma plataforma de indicações do zero na {company}, com agentes de IA
        como parte central do fluxo. Dá uma olhada no meu{' '}
        <Link to="/blog">blog</Link> pra ver no que estou pensando.
      </>
    ) : (
      <>
        Building things that scale. Currently building internal applications and
        a referral platform from scratch at {company}, with AI code agents as a
        first-class part of the workflow. Check out my{' '}
        <Link to="/blog">blog</Link> to see what I'm thinking about.
      </>
    );

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.top}>
        <div className={styles.text}>
          <h1 className={styles.name}>
            {profile.name} <span>{profile.lastName}</span>
          </h1>
          <p className={styles.subtitle}>{profile.subtitle[locale]}</p>
          <p className={styles.bio}>{bio}</p>
        </div>
        <div className={styles.avatar}>
          <img src={profile.avatar} alt={profile.fullName} />
        </div>
      </div>

      <div className={styles.pills}>
        {config.availableForProjects && (
          <span className={`${styles.pill} ${styles.active}`}>
            <span className={styles.dot} aria-hidden="true" />
            {ui.available[locale]}
          </span>
        )}
        {pills.map((pill) => (
          <span key={pill} className={styles.pill}>
            {pill}
          </span>
        ))}
      </div>

      <div className={styles.links}>
        <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">
          <GithubIcon size={15} />
          GitHub
        </a>
        <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedinIcon size={15} />
          LinkedIn
        </a>
        <a href={profile.socials.x} target="_blank" rel="noopener noreferrer">
          <XIcon size={15} />
          X
        </a>
        <a href={`mailto:${profile.email}`}>
          <Mail size={15} strokeWidth={2} />
          Email
        </a>
      </div>
    </section>
  );
}
