import { notFound } from "next/navigation";
import { sanityWriteClient } from "@/lib/sanity";
import EditArticleForm from "./EditArticleForm";

interface Props {
  params: { id: string };
}

async function getArticle(id: string) {
  try {
    return await sanityWriteClient.fetch(
      `*[_id == $id][0]{
        _id,
        title,
        slug,
        type,
        author,
        status,
        excerpt,
        mainImageUrl,
        seo,
        body
      }`,
      { id }
    );
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return null;
  }
}

export default async function EditArticlePage({ params }: Props) {
  const article = await getArticle(params.id);

  if (!article) {
    notFound();
  }

  return <EditArticleForm article={article} />;
}
