import type {ReactNode} from 'react';
import {ArrowUpRight} from 'lucide-react';
import type {Education} from '@site/src/data/portfolio';
import {useLocale} from '../locale';
import styles from './styles.module.css';

type Props = {
  education: Education;
};

/**
 * Item de formação. Link externo com indicador ↗ (ArrowUpRight) que aparece no
 * hover — diferenciando seu comportamento dos itens expansíveis da seção Work.
 */
export default function EducationItem({education}: Props): ReactNode {
  const {locale} = useLocale();
  const {course, institution, period, href} = education;
  return (
    <a
      className={styles.item}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div>
        <div className={styles.name}>{course[locale]}</div>
        <div className={styles.inst}>{institution}</div>
      </div>
      <div className={styles.right}>
        <span className={styles.year}>{period}</span>
        <ArrowUpRight className={styles.arrow} size={15} aria-hidden="true" />
      </div>
    </a>
  );
}
