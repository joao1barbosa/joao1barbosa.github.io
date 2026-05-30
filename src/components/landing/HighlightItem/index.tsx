import type {ReactNode} from 'react';
import type {Highlight} from '@site/src/data/portfolio';
import {useLocale} from '../locale';
import styles from './styles.module.css';

type Props = {
  highlight: Highlight;
};

export default function HighlightItem({highlight}: Props): ReactNode {
  const {locale} = useLocale();
  const {name, org, period, monogram, description, tags} = highlight;
  return (
    <div className={styles.item}>
      <div className={styles.icon} aria-hidden="true">
        {monogram}
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.name}>{name}</span>
          <span className={styles.period}>{period}</span>
        </div>
        <div className={styles.org}>{org}</div>
        <p className={styles.desc}>{description[locale]}</p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag.en} className={styles.tag}>
              {tag[locale]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
