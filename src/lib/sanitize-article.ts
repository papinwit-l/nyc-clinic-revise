import sanitizeHtml from "sanitize-html";

/**
 * Server-side sanitiser for article HTML.
 *
 * Separate from lib/dompurify.ts on purpose. That one only runs in the
 * browser (on the server it returns the HTML untouched) and its allow-list
 * has no img / figure / blockquote / iframe — fine for short CMS snippets,
 * but an article body would lose every image and embed. This runs on the
 * server, so ArticleBody stays a server component and the HTML that reaches
 * the browser is already clean.
 */
export function sanitizeArticle(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "strong", "b", "em", "i", "u", "a",
      "h2", "h3", "h4", "ul", "ol", "li", "blockquote", "hr",
      "figure", "figcaption", "img", "iframe",
      "table", "thead", "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      figure: ["class"],
      iframe: ["src", "width", "height", "allow", "allowfullscreen", "title"],
    },
    // Video embeds: YouTube only (the clinic's channel). Anything else is dropped.
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
    // WP leaves empty paragraphs behind; they render as stray gaps.
    exclusiveFilter: (frame) =>
      frame.tag === "p" && !frame.text.trim() && !frame.mediaChildren?.length,
  });
}
