import {useState, type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import {
  profile,
  workExperience,
  projects,
  skills,
  highlights,
  education,
  ui,
} from '@site/src/data/portfolio';
import Hero from '@site/src/components/landing/Hero';
import Section from '@site/src/components/landing/Section';
import WorkItem from '@site/src/components/landing/WorkItem';
import ProjectCard from '@site/src/components/landing/ProjectCard';
import HighlightItem from '@site/src/components/landing/HighlightItem';
import EducationItem from '@site/src/components/landing/EducationItem';
import {useLocale} from '@site/src/components/landing/locale';

import styles from './index.module.css';

function Work(): ReactNode {
  const {locale} = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <Section index="02" title={ui.sections.work[locale]} id="work">
      <ul className={styles.list}>
        {workExperience.map((work, index) => (
          <WorkItem
            key={work.company}
            work={work}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </ul>
    </Section>
  );
}

function About(): ReactNode {
  const {locale} = useLocale();
  return (
    <Section index="01" title={ui.sections.about[locale]} id="about">
      <p className={styles.about}>
        {locale === 'pt' ? (
          <>
            Sou Engenheiro de Software FullStack na{' '}
            <a href={profile.company.href} target="_blank" rel="noopener noreferrer">
              <strong>{profile.company.name}</strong>
            </a>
            , um gateway de pagamentos evoluindo para uma fintech, onde refatoro
            sistemas críticos e entrego features de pagamento com{' '}
            <strong>Next.js</strong> e <strong>Supabase</strong> — usando IA como
            alavanca de engenharia, com as decisões de arquitetura sempre sob meu
            controle. Minha trajetória une desenvolvimento e infraestrutura: uma{' '}
            <a href="#work">residência de alto impacto na BRISA &amp; UFG</a>{' '}
            (backend para a área de saúde) e uma{' '}
            <a href="#work">base sólida em infraestrutura de TI</a>, que hoje
            aprofundo num homelab próprio de R&amp;D. Estou{' '}
            <a href="#education">cursando Engenharia de Software</a> enquanto exploro
            arquitetura e sistemas distribuídos em projetos pessoais.
          </>
        ) : (
          <>
            I'm a FullStack Software Engineer at{' '}
            <a href={profile.company.href} target="_blank" rel="noopener noreferrer">
              <strong>{profile.company.name}</strong>
            </a>
            , a payment gateway evolving into a fintech, where I refactor critical
            systems and ship payment features with <strong>Next.js</strong> and{' '}
            <strong>Supabase</strong> — using AI as an engineering lever, with the
            architectural decisions always mine. My path bridges development and
            infrastructure: a high-impact{' '}
            <a href="#work">residency at BRISA &amp; UFG</a> (backend for healthcare)
            and a <a href="#work">solid foundation in IT infrastructure</a>, which I
            now deepen in a personal R&amp;D homelab. I'm{' '}
            <a href="#education">pursuing my degree in Software Engineering</a> while
            exploring architecture and distributed systems through personal projects.
          </>
        )}
      </p>
    </Section>
  );
}

function Skills(): ReactNode {
  const {locale} = useLocale();
  return (
    <Section index="03" title={ui.sections.skills[locale]} id="skills">
      <div className={styles.skills}>
        {skills.map((skill) => (
          <span key={skill} className={styles.skill}>
            {skill}
          </span>
        ))}
      </div>
    </Section>
  );
}

function Projects(): ReactNode {
  const {locale} = useLocale();
  return (
    <Section index="04" title={ui.sections.projects[locale]} id="projects">
      <div className={styles.list}>
        {projects.map((project) => (
          <ProjectCard key={project.name.en} project={project} />
        ))}
      </div>
    </Section>
  );
}

function Highlights(): ReactNode {
  const {locale} = useLocale();
  return (
    <Section index="05" title={ui.sections.highlights[locale]} id="highlights">
      <div className={styles.list}>
        {highlights.map((highlight) => (
          <HighlightItem key={highlight.name} highlight={highlight} />
        ))}
      </div>
    </Section>
  );
}

function Education(): ReactNode {
  const {locale} = useLocale();
  return (
    <Section index="06" title={ui.sections.education[locale]} id="education">
      <div className={styles.list}>
        {education.map((item) => (
          <EducationItem key={item.institution} education={item} />
        ))}
      </div>
    </Section>
  );
}

function Contact(): ReactNode {
  const {locale} = useLocale();
  return (
    <Section index="07" title={ui.sections.contact[locale]} id="contact">
      <div className={styles.contact}>
        <h2 className={styles.contactHeading}>
          {locale === 'pt' ? (
            <>
              Vamos <span>conversar.</span>
            </>
          ) : (
            <>
              Let's <span>talk.</span>
            </>
          )}
        </h2>
        <p className={styles.contactBody}>
          {locale === 'pt' ? (
            <>
              Me chame em{' '}
              <a href={`mailto:${profile.email}`}>{profile.email}</a> ou pelas
              redes abaixo. Sempre aberto a projetos e conversas interessantes.
              Você também pode ver meu <Link to="/blog">blog</Link> e{' '}
              <Link to="/notebook">notebook</Link>.
            </>
          ) : (
            <>
              Reach me at{' '}
              <a href={`mailto:${profile.email}`}>{profile.email}</a> or via the
              social links below. Always open to interesting projects and
              conversations. You can also browse my <Link to="/blog">blog</Link>{' '}
              and <Link to="/notebook">notebook</Link>.
            </>
          )}
        </p>
      </div>
    </Section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      noFooter
      title={siteConfig.title}
      description="João Barbosa — Fullstack Software Engineer (Next.js, Supabase, TypeScript)."
    >
      {/* LocaleProvider + FloatingDock são injetados globalmente via theme/Layout. */}
      <main className={styles.page}>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Projects />
        <Highlights />
        <Education />
        <Contact />
      </main>
    </Layout>
  );
}
