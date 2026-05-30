import type {ReactNode} from 'react';
import clsx from 'clsx';
import type {WorkExperience} from '@site/src/data/portfolio';
import styles from './styles.module.css';

type Props = {
  work: WorkExperience;
  isOpen: boolean;
  onToggle: () => void;
};

/**
 * Item de experiência profissional no padrão "Espelhamento Minimalista":
 * conteúdo alinhado à esquerda sobre uma linha vertical fina, com as datas
 * rigidamente alinhadas à extrema direita. Clique expande a descrição (acordeão).
 */
export default function WorkItem({work, isOpen, onToggle}: Props): ReactNode {
  const {company, role, start, end, description} = work;

  return (
    <li className={styles.item}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <div className={styles.header}>
          <div className={styles.info}>
            <span className={styles.company}>
              {company}
              <span className={styles.arrow} aria-hidden="true">
                ›
              </span>
            </span>
            <span className={styles.role}>{role}</span>
          </div>
          <span className={styles.date}>
            {start} — {end}
          </span>
        </div>

        <div className={clsx(styles.content, isOpen && styles.contentOpen)}>
          <div className={styles.description}>
            <p>{description}</p>
          </div>
        </div>
      </button>
    </li>
  );
}
