import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {Mail} from 'lucide-react';
import {profile, pills, config, ui} from '@site/src/data/portfolio';
import {GithubIcon, LinkedinIcon, XIcon} from '../brand-icons';
import {useLocale} from '../locale';
import styles from './styles.module.css';

export default function Hero(): ReactNode {
  const {locale} = useLocale();

  const bio =
    locale === 'pt' ? (
      <>
        Construindo coisas que escalam. Atualmente refatorando sistemas críticos
        e entregando features de pagamento na{' '}
        <a href={profile.company.href} target="_blank" rel="noopener noreferrer">
          <strong>{profile.company.name}</strong>
        </a>
        . Dá uma olhada no meu <Link to="/blog">blog</Link> pra ver no que estou
        pensando.
      </>
    ) : (
      <>
        Building things that scale. Currently refactoring critical systems and
        shipping payment features at{' '}
        <a href={profile.company.href} target="_blank" rel="noopener noreferrer">
          <strong>{profile.company.name}</strong>
        </a>
        . Check out my <Link to="/blog">blog</Link> to see what I'm thinking
        about.
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
        <a
          className={styles.avatar}
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <img src={profile.avatar} alt={profile.fullName} />
        </a>
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
