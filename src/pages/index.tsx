import {useState, type ReactNode} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import {
  profile,
  workExperience,
  education,
  skills,
} from '@site/src/data/portfolio';
import WorkItem from '@site/src/components/landing/WorkItem';
import EducationItem from '@site/src/components/landing/EducationItem';
import FloatingDock from '@site/src/components/landing/FloatingDock';

import styles from './index.module.css';

function Hero(): ReactNode {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroIntro}>
        <h1>Hi, I'm {profile.name}</h1>
        <p>
          Software engineer amazed by building things. Check the blog to see
          what I've done and what I'm doing.
        </p>
      </div>
      <img
        className={styles.avatar}
        src={profile.avatar}
        width={120}
        height={120}
        alt="João Barbosa"
      />
    </section>
  );
}

function About(): ReactNode {
  return (
    <section id="about" className={`${styles.section} ${styles.about}`}>
      <h2>About</h2>
      <p>
        I'm a fullstack software engineer, currently working at{' '}
        <a href="#work">Payevo</a>, a Fintech, where I build payment products
        with <strong>Next.js</strong>, <strong>Supabase</strong> and{' '}
        <strong>TypeScript</strong>. Previously I completed an ICT residency at{' '}
        <a href="#work">BRISA &amp; UFG</a>, and I'm pursuing a{' '}
        <a href="#education">degree in software engineering</a> while sharpening
        my craft through personal projects and innovation programs.
      </p>
    </section>
  );
}

function WorkExperience(): ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="work" className={styles.section}>
      <h2>Work Experience</h2>
      <ul className={styles.timeline}>
        {workExperience.map((work, index) => (
          <WorkItem
            key={work.company}
            work={work}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </ul>
    </section>
  );
}

function Projects(): ReactNode {
  return (
    <section id="projects" className={styles.section}>
      <h2>Projects</h2>
      <p className={styles.placeholder}>
        Selected work is on its way — in the meantime, explore my code on{' '}
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
    </section>
  );
}

function Skills(): ReactNode {
  return (
    <section id="skills" className={styles.section}>
      <h2>Skills</h2>
      <div className={styles.skills}>
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </section>
  );
}

function Highlights(): ReactNode {
  return (
    <section id="highlights" className={styles.section}>
      <h2>Highlights &amp; Engagements</h2>
      <p className={styles.placeholder}>
        Talks, events and innovation programs will be featured here soon.
      </p>
    </section>
  );
}

function Education(): ReactNode {
  return (
    <section id="education" className={styles.section}>
      <h2>Education</h2>
      <ul className={styles.timeline}>
        {education.map((item) => (
          <EducationItem key={item.institution} education={item} />
        ))}
      </ul>
    </section>
  );
}

function Contact(): ReactNode {
  return (
    <section id="contact" className={`${styles.section} ${styles.contact}`}>
      <h2>Contact</h2>
      <h3>Get in Touch</h3>
      <p>
        Reach me via email at{' '}
        <a href={`mailto:${profile.email}`}>{profile.email}</a> or through the
        social links in the dock below.
      </p>
    </section>
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
      {/* Marcador global "home-landing": custom.css usa :has() para esconder a
          navbar apenas nesta página (SSR-safe, sem flash). O dock substitui a nav. */}
      <main className={`${styles.container} home-landing`}>
        <div className={styles.main}>
          <Hero />
          <About />
          <WorkExperience />
          <Projects />
          <Skills />
          <Highlights />
          <Education />
          <Contact />
        </div>
      </main>
      <FloatingDock />
    </Layout>
  );
}
