import { sanitizeArticle } from "@/lib/sanitize-article";

/**
 * Renders article HTML (WP content.rendered). Server component — sanitised
 * before it leaves the server.
 *
 * Styling lives in globals.css under .article-body, not Tailwind's `prose`:
 * the typography plugin is installed but not loaded, and the article needs
 * the brand's own h2 rule, diamond bullets and Thai line-height anyway.
 * `data-lang` picks the Thai or Latin faces — content language, not locale.
 */
export default function ArticleBody({
  html,
  lang,
}: {
  html: string;
  lang: "th" | "en";
}) {
  return (
    <div
      className="article-body"
      data-lang={lang}
      lang={lang}
      dangerouslySetInnerHTML={{ __html: sanitizeArticle(html) }}
    />
  );
}
