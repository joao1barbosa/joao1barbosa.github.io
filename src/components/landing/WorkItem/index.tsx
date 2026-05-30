import {useState, type ReactNode} from 'react';
import clsx from 'clsx';
import {ChevronRight} from 'lucide-react';
import type {WorkExperience} from '@site/src/data/portfolio';
import {useLocale} from '../locale';
import styles from './styles.module.css';

function WorkLogo({
  logo,
  monogram,
  alt,
}: {
  logo?: string;
  monogram: string;
  alt: string;
}): ReactNode {
  const [failed, setFailed] = useState(false);
  return (
    <div className={styles.logo}>
      {logo && !failed ? (
        <img src={logo} alt={alt} onError={() => setFailed(true)} />
      ) : (
        <span className={styles.monogram}>{monogram}</span>
      )}
    </div>
  );
}

type Props = {
  work: WorkExperience;
  isOpen: boolean;
  onToggle: () => void;
};

/**
 * Item de experiência no padrão "Espelhamento Minimalista": conteúdo à esquerda,
 * período rigidamente alinhado à extrema direita. Clique expande a descrição.
 */
export default function WorkItem({work, isOpen, onToggle}: Props): ReactNode {
  const {locale} = useLocale();
  const {company, role, period, logo, monogram, description} = work;

  return (
    <li className={clsx(styles.item, isOpen && styles.active)}>
      <button
        type="button"
        className={styles.summary}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <WorkLogo logo={logo} monogram={monogram} alt={company} />
        <span className={styles.meta}>
          <span className={styles.company}>{company}</span>
          <span className={styles.role}>{role[locale]}</span>
        </span>
        <span className={styles.right}>
          <span className={styles.date}>{period}</span>
        </span>
        <ChevronRight className={styles.chevron} size={16} aria-hidden="true" />
      </button>
      <div className={styles.body}>
        <div className={styles.inner}>
          <p>{description[locale]}</p>
        </div>
      </div>
    </li>
  );
}
