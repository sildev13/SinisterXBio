import React from "react";

import { about, certificates, home, person, social } from "@/resources";
import { getPosts } from "@/utils/utils";

/**
 * Flatten the JSX used throughout content.tsx into plain text, so the
 * assistant can be fed the same copy that the site renders.
 */
function nodeToText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");

  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    // <br /> and friends have no children – treat them as a space
    if (props.children === undefined) return " ";
    return nodeToText(props.children);
  }

  return "";
}

function tidy(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

let cached: string | null = null;

/**
 * Builds the knowledge base handed to Gemini as a system instruction.
 * Everything here is already public on the site – no secrets.
 */
export function buildProfileContext() {
  if (cached) return cached;

  const sections: string[] = [];

  sections.push(
    [
      "# Profile",
      `Name: ${person.name}`,
      `Goes by: ${person.firstName} (nickname "Sin")`,
      `Role: ${person.role}`,
      `Based in: ${person.languages?.join(", ") ?? person.location}`,
      `Email: ${person.email}`,
      `Tagline: ${tidy(nodeToText(home.subline))}`,
    ].join("\n"),
  );

  if (about.intro?.display) {
    sections.push(`# Introduction\n${tidy(nodeToText(about.intro.description))}`);
  }

  if (about.work?.display) {
    const experiences = about.work.experiences.map((experience) =>
      [
        `## ${experience.company} — ${experience.role} (${experience.timeframe})`,
        ...experience.achievements.map((item) => `- ${tidy(nodeToText(item))}`),
      ].join("\n"),
    );
    sections.push(`# Work experience\n${experiences.join("\n")}`);
  }

  if (about.studies?.display) {
    const institutions = about.studies.institutions.map(
      (institution) => `- ${institution.name}: ${tidy(nodeToText(institution.description))}`,
    );
    sections.push(`# Education\n${institutions.join("\n")}`);
  }

  if (about.technical?.display) {
    const skills = about.technical.skills.map(
      (skill) => `- ${skill.title}: ${skill.tags?.map((tag) => tag.name).join(", ")}`,
    );
    sections.push(`# Technical skills\n${skills.join("\n")}`);
  }

  if (about.devices?.display) {
    const devices = about.devices.items.map(
      (device) => `- ${device.name}: ${tidy(nodeToText(device.description))}`,
    );
    sections.push(`# Devices\n${devices.join("\n")}`);
  }

  if (certificates.items?.length) {
    const awards = certificates.items.map(
      (item: { title: string; description: string; date: string }) =>
        `- ${item.title} (${item.date}): ${item.description}`,
    );
    sections.push(`# Certificates and awards\n${awards.join("\n")}`);
  }

  try {
    const projects = getPosts(["src", "app", "work", "projects"])
      .sort(
        (a, b) =>
          new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
      )
      .map((project) =>
        [
          `## ${project.metadata.title}`,
          project.metadata.summary && `Summary: ${tidy(project.metadata.summary)}`,
          `Link: /work/${project.slug}`,
          // First part of the body gives the model something concrete to quote
          `Details: ${tidy(project.content).slice(0, 700)}`,
        ]
          .filter(Boolean)
          .join("\n"),
      );

    if (projects.length) {
      sections.push(`# Projects\n${projects.join("\n\n")}`);
    }
  } catch (error) {
    console.error("Could not read project MDX for AI context", error);
  }

  sections.push(
    `# Links\n${social.map((item) => `- ${item.name}: ${item.link}`).join("\n")}\n- Contact form: /contact`,
  );

  sections.push(
    "# Site map\n- / (home)\n- /about\n- /work (projects)\n- /gallery (photos)\n- /certificates (awards and competition certificates)\n- /contact (message form that reaches Sin directly)",
  );

  cached = sections.join("\n\n");
  return cached;
}
