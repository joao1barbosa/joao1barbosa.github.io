import type {ReactNode} from 'react';
import styles from './styles.module.css';

type Props = {
  /** Número de ordem, ex.: "01". */
  index: string;
  title: string;
  id?: string;
  children: ReactNode;
};

/** Seção com label monoespaçado ("01 · About") e linha divisória à direita. */
export default function Section({index, title, id, children}: Props): ReactNode {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.label}>
        <span>
          {index} · {title}
        </span>
      </div>
      {children}
    </section>
  );
}
