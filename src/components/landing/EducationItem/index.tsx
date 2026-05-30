import type {ReactNode} from 'react';
import type {Education} from '@site/src/data/portfolio';
import styles from './styles.module.css';

type Props = {
  education: Education;
};

/**
 * Item de formação acadêmica no mesmo padrão "Espelhamento Minimalista" do
 * WorkItem: curso/instituição à esquerda sobre a timeline e o período rigidamente
 * alinhado à extrema direita. Link externo abre o site da instituição.
 */
export default function EducationItem({education}: Props): ReactNode {
  const {course, institution, start, end, href} = education;

  return (
    <li className={styles.item}>
      <a
        className={styles.link}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.info}>
          <span className={styles.course}>
            {course}
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
          </span>
          <span className={styles.institution}>{institution}</span>
        </div>
        <span className={styles.date}>
          {start} — {end}
        </span>
      </a>
    </li>
  );
}
