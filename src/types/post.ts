export type PostCategory = "Guides" | "Tips" | "News";

export type PostCard = {
  slug: string;
  image: string;
  title: string;
  excerpt: string;
  /** Always the English label — it is set uppercase + tracked, which Thai
      script cannot take. */
  category: PostCategory;
  date: string;
  /**
   * Language the title/excerpt/content are actually written in — NOT the page
   * locale. A Thai-only article served on /en has lang "th", and its text must
   * still be set in the Thai faces (font-follows-language rule).
   */
  lang: "th" | "en";
};

export type Post = PostCard & {
  /** HTML, as WordPress returns it in content.rendered. */
  content: string;
  readingMinutes: number;
};
