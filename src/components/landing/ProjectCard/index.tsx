import type {ReactNode} from 'react';
import type {Project} from '@site/src/data/portfolio';
import {useLocale} from '../locale';
import styles from './styles.module.css';

type Props = {
  project: Project;
};

export default function ProjectCard({project}: Props): ReactNode {
  const {locale} = useLocale();
  const {name, period, description, tags} = project;
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span className={styles.name}>{name}</span>
        <span className={styles.period}>{period}</span>
      </div>
      <p className={styles.desc}>{description[locale]}</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
