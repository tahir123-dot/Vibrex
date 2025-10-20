import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../store/Slices/productSlice";

const Add = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

  const [mediaType, setMediaType] = useState("image");
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload either an image or a video.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("mediaType", mediaType);
    formData.append("file", file);

    // 🚀 Redux action dispatch
    dispatch(addProduct(formData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add Product
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Product Name (optional) */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Product Name (optional)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Description (optional) */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Description (optional)
            </label>
            <textarea
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          {/* Media Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Upload Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="media"
                  value="image"
                  checked={mediaType === "image"}
                  onChange={() => {
                    setMediaType("image");
                    setFile(null);
                  }}
                  className="text-blue-500"
                />
                Image
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="media"
                  value="video"
                  checked={mediaType === "video"}
                  onChange={() => {
                    setMediaType("video");
                    setFile(null);
                  }}
                  className="text-blue-500"
                />
                Video
              </label>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              {mediaType === "image" ? "Upload Image *" : "Upload Video *"}
            </label>
            <input
              type="file"
              id="file"
              accept={mediaType === "image" ? "image/*" : "video/*"}
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
            />
          </div>

          {/* Redux State Messages */}
          {loading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
