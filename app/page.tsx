

import { getPosts } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { HeroSection } from "../components/HeroSection";
import { BackToTop } from "@/components/BackToTop";
import { formatDateShort } from "@/lib/utils";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function Home() {
  const articles = await getPosts(10); // Limiter à 10 articles récents

  return (
    <>
      <HeroSection />

      <div className="max-w-4xl mx-auto px-6 pb-24">
        <section>
          <div className="space-y-0 divide-y divide-gray-800">
            {articles.map((article) => (
              <Card
                key={article.id}
                title={article.title}
                date={formatDateShort(article.date)}
                excerpt={article.excerpt}
                href={`/blog/${article.slug}`}
                tags={article.tags}
                content={article.content}
                coverImage={article.coverImage}
                author={article.author}
              />
            ))}
          </div>
        </section>
      </div>

      <BackToTop />
    </>
  );
}


