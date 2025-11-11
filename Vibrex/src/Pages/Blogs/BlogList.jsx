import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SPACE_ID = "onvf7gqo3e52";
const ACCESS_TOKEN = "5tNP9UH44HFgc16WCaz-Rc6PRH-qWqOW2Stm2StzHys";
const CONTENT_TYPE = "pageBlogPost";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}&include=2`
        );
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();

        const blogsWithAssets = data.items.map((item) => {
          const featuredImageId = item.fields.featuredImage?.sys?.id;
          const featuredImageAsset = data.includes?.Asset?.find(
            (asset) => asset.sys.id === featuredImageId
          );

          // 🔹 Author info resolve
          const authorId = item.fields.author?.sys?.id;
          const authorEntry = data.includes?.Entry?.find(
            (entry) => entry.sys.id === authorId
          );

          // 🔹 Author image resolve (avatar / profileImage / profilePicture)
          const authorImageId =
            authorEntry?.fields?.avatar?.sys?.id ||
            authorEntry?.fields?.profileImage?.sys?.id ||
            authorEntry?.fields?.profilePicture?.sys?.id;

          const authorImageAsset = data.includes?.Asset?.find(
            (asset) => asset.sys.id === authorImageId
          );

          // 🔹 Make sure image URL has https
          const authorImageUrl = authorImageAsset
            ? authorImageAsset.fields.file.url.startsWith("//")
              ? "https:" + authorImageAsset.fields.file.url
              : authorImageAsset.fields.file.url
            : null;

          const featuredImageUrl = featuredImageAsset
            ? featuredImageAsset.fields.file.url.startsWith("//")
              ? "https:" + featuredImageAsset.fields.file.url
              : featuredImageAsset.fields.file.url
            : null;

          return {
            id: item.sys.id,
            title: item.fields.title,
            shortDescription: item.fields.shortDescription,
            author: authorEntry?.fields?.name || "Unknown Author",
            authorImage: authorImageUrl,
            publishedDate: item.fields.publishedDate || "",
            featuredImage: featuredImageUrl,
          };
        });

        setBlogs(blogsWithAssets);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return <p className="text-center mt-20 text-gray-700">Loading blogs...</p>;
  if (error)
    return (
      <p className="text-center mt-20 text-red-500 font-semibold">
        Error: {error}
      </p>
    );

  const featured = blogs[0];
  const latest = blogs.slice(1);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* 🌟 Featured Blog (Clickable) */}
        {featured && (
          <Link
            to={`/blog/${featured.id}`}
            className="block bg-white rounded-2xl shadow-lg overflow-hidden mb-16 hover:shadow-2xl transition-all"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left: Text */}
              <div className="p-8 flex flex-col justify-center md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 hover:text-gray-600 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-600 mb-6 text-base">
                  {featured.shortDescription}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  {featured.authorImage && (
                    <img
                      src={featured.authorImage}
                      alt={featured.author}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <span className="font-medium">{featured.author}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {featured.publishedDate
                      ? new Date(featured.publishedDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : ""}
                  </span>
                </div>
              </div>

              {/* Right: Image */}
              {featured.featuredImage && (
                <img
                  src={featured.featuredImage}
                  alt={featured.title}
                  className="w-full md:w-1/2 h-64 md:h-auto object-cover"
                />
              )}
            </div>
          </Link>
        )}

        {/* 📰 Latest Articles */}
        <h3 className="text-2xl font-semibold mb-6 text-gray-900">
          Latest Articles
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latest.map((blog) => (
            <Link
              to={`/blog/${blog.id}`}
              key={blog.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col"
            >
              {blog.featuredImage && (
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6 flex flex-col flex-1">
                <h4 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {blog.title}
                </h4>
                <p className="text-gray-600 text-sm flex-1 mb-4 line-clamp-3">
                  {blog.shortDescription}
                </p>
                <div className="flex items-center text-sm text-gray-500 mt-auto">
                  {blog.authorImage && (
                    <img
                      src={blog.authorImage}
                      alt={blog.author}
                      className="w-7 h-7 rounded-full mr-2"
                    />
                  )}
                  <span className="font-medium">{blog.author}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {blog.publishedDate
                      ? new Date(blog.publishedDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : ""}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ⚙️ Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p className="max-w-3xl mx-auto">
            Our company specializes in the development of advanced technologies
            for a wide range of industries. We use cutting-edge techniques and
            digital innovation to deliver smart, scalable, and impactful
            solutions.
          </p>
          <p className="mt-4">Powered by Vibrex</p>
        </footer>
      </div>
    </div>
  );
};

export default BlogList;
