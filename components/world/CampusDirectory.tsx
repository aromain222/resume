"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { campus } from "@/lib/campus";
import styles from "./campus.module.css";

export default function CampusDirectory() {
  const [query, setQuery] = useState("");
  const matches = campus.filter((stop) => [stop.title, stop.group, stop.role, stop.description, ...stop.bullets].join(" ").toLowerCase().includes(query.trim().toLowerCase()));
  return <section className={styles.world} aria-label="Campus directory">
    <div className={styles.heading}><div><h1>Directory</h1><p>Projects, experience, and life outside work. No walking required.</p></div><a href="#world">Explore the campus</a></div>
    <label className={styles.searchLabel} htmlFor="campus-search">Find a destination</label>
    <input id="campus-search" className={styles.searchInput} type="search" placeholder="Search names, interests, or experience" value={query} onChange={(event) => setQuery(event.target.value)} />
    <p className={styles.searchCount} role="status">{matches.length} of {campus.length} destinations</p>
    <div className={styles.flatDirectory}>
      {matches.map((stop) => <details key={stop.id}>
        <summary><span>{stop.title}</span><span>{stop.group} <ChevronDown size={14} aria-hidden="true" /></span></summary>
        {stop.role && <p>{stop.role}{stop.period ? ` · ${stop.period}` : ""}</p>}
        <p>{stop.description}</p>
        <ul>{stop.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        <div>{stop.links.map((link) => <a key={link.href} href={link.href} target={link.href.startsWith("https:") ? "_blank" : undefined} rel={link.href.startsWith("https:") ? "noopener noreferrer" : undefined}>{link.label}</a>)}</div>
      </details>)}
      {matches.length === 0 && <p>No destinations match “{query}”. Try a project name or clear your search.</p>}
    </div>
  </section>;
}
