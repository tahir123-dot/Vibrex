// src/Pages/Blogs/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = createClient({
  space: "onvf7gqo3e52",
  accessToken: "5tNP9UH44HFgc16WCaz-Rc6PRH-qWqOW2Stm2StzHys",
});

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [includes, setIncludes] = useState({ Entry: [], Asset: [] });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await client.getEntries({
          content_type: "pageBlogPost",
          "fields.slug": slug,
          include: 10,
        });

        if (response.items.length > 0) {
          setBlog(response.items[0]);
          setIncludes(response.includes);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [slug]);

  const getAssetUrl = (assetId) => {
    const asset = includes.Asset.find((a) => a.sys.id === assetId);
    return asset
      ? asset.fields.file.url.startsWith("//")
        ? "https:" + asset.fields.file.url
        : asset.fields.file.url
      : "";
  };

  const getEntryById = (entryId) =>
    includes.Entry.find((e) => e.sys.id === entryId);

  const renderEmbeddedEntry = (node) => {
    const entryId = node.data.target.sys.id;
    const entry = getEntryById(entryId);
    if (!entry) return null;

    if (entry.sys.contentType.sys.id === "componentRichImage") {
      const imageUrl = getAssetUrl(entry.fields.image.sys.id);
      return (
        <div className="flex flex-col items-center my-10">
          <img
            src={imageUrl}
            alt={entry.fields.caption || ""}
            className={`w-full ${
              entry.fields.fullWidth ? "max-w-full" : "max-w-3xl"
            } rounded-lg shadow-md object-cover`}
          />
          {entry.fields.caption && (
            <p className="text-gray-500 italic mt-2 text-center">
              {entry.fields.caption}
            </p>
          )}
        </div>
      );
    }

    return null;
  };

  if (!blog)
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  const { fields } = blog;
  const authorEntry = getEntryById(fields.author?.sys.id);
  const author = authorEntry ? authorEntry.fields : null;
  console.log("ya ly author ki image ", author);
  const authorAvatarUrl = author?.avatar?.sys?.id
    ? getAssetUrl(author.avatar.sys.id)
    : null;
  const featuredImageUrl = fields.featuredImage?.sys?.id
    ? getAssetUrl(fields.featuredImage.sys.id)
    : null;

  return (
    <div className=" bg-white">
      <div className="bg-white text-gray-800 min-h-screen py-10 px-5 md:px-10 font-inter leading-relaxed max-w-5xl mx-auto">
        <Link
          to="/blog"
          className="inline-block mb-6 text-gray-600 font-medium hover:text-gray-800 transition-colors"
        >
          ← Back to All Blogs
        </Link>

        {featuredImageUrl && (
          <div className="flex justify-center mb-8">
            <img
              src={featuredImageUrl}
              alt={fields.title}
              className="w-full max-w-3xl max-h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          {fields.title}
        </h1>
        <p className="text-gray-500 mb-6 text-center">
          {fields.shortDescription}
        </p>

        {author && (
          <div className="flex items-center justify-center mb-10 space-x-3">
            {authorAvatarUrl && (
              <img
                src={authorAvatarUrl}
                alt={author.name}
                className="w-10 h-10 rounded-full object-cover shadow"
              />
            )}
            <span className="text-gray-700 font-medium">{author.name}</span>
          </div>
        )}

        <div className="prose max-w-none text-gray-800 prose-img:rounded-lg prose-img:shadow-md">
          {documentToReactComponents(fields.content, {
            renderNode: {
              "embedded-entry-block": (node) => renderEmbeddedEntry(node),
            },
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
