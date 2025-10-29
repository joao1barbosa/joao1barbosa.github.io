import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.banner}>
      <div className={styles.container}>
        <h1>Welcome to Joao Barbosa's Blog</h1>
        <p>{siteConfig.tagline}</p>
      </div>
      <img
        className={styles.banner__avatar}
        src="https://pbs.twimg.com/profile_images/1972431076166410240/hzwhrDpF_400x400.jpg"
        alt="Profile photo"
      />
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`}>
      <HomepageHeader />
      <main></main>
    </Layout>
  );
}
