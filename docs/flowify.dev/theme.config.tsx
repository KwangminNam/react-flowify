import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <strong>flowify</strong>,
  project: {
    link: "https://github.com/KwangminNam/flowify",
  },
  docsRepositoryBase:
    "https://github.com/KwangminNam/flowify/tree/main/docs/flowify.dev",
  footer: {
    content: "flowify — Declarative JSX components for React",
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    title: "On This Page",
  },
  editLink: {
    content: "Edit this page on GitHub →",
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="flowify documentation" />
    </>
  ),
};

export default config;
