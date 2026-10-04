import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Plane,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { MOCK_PRODUCTS } from "../data/mockProducts";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState<string>(
    product?.image || "/images/hero-watch.jpg"
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.variants?.sizes?.[0] || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.variants?.colors?.[0] || ""
  );
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) {
    return (
      <div className="py-24 bg-ivory text-center">
        <h2 className="font-serif text-3xl font-medium text-tgs-black mb-4">
          Product Not Found
        </h2>
        <p className="text-text-secondary text-sm mb-6">
          The requested product could not be located in our current catalogue.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-tgs-black text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-olive"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </Link>
      </div>
    );
  }

  const handleRequestItem = () => {
    const specs = [selectedSize, selectedColor].filter(Boolean).join(" / ");
    const params = new URLSearchParams({
      productName: product.name,
      brand: product.brand,
      category: product.category,
      url: product.referenceUrl || window.location.href,
    });
    if (specs) {
      params.set("query", `${product.name} (${specs}) x${quantity}`);
    }
    navigate(`/request?${params.toString()}`);
  };

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-tgs-black"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
        </div>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white rounded-3xl border border-border-tgs p-6 sm:p-10 shadow-elevated">
          {/* Left: Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-border-tgs bg-beige">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-ivory/95 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-tgs-black border border-border-tgs">
                {product.brand}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? "border-olive ring-2 ring-olive/20"
                        : "border-border-tgs opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info, Variants, Request Form */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Title */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-olive mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{product.categoryLabel} • Dubai Sourced</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-tgs-black mb-3">
                {product.name}
              </h1>

              {/* Price Note */}
              <div className="mb-6 p-4 rounded-xl bg-ivory/80 border border-border-tgs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
                    Pricing Journey:
                  </span>
                  <span className="font-serif text-2xl font-semibold text-tgs-black">
                    {product.priceNote}
                  </span>
                </div>
                {product.indicativePriceAED && (
                  <div className="text-right text-xs text-text-secondary">
                    <span>Indicative retail in UAE:</span>
                    <p className="font-semibold text-tgs-black">
                      ~AED {product.indicativePriceAED.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6 font-sans">
                {product.description}
              </p>

              {/* Variant Choices: Sizes */}
              {product.variants?.sizes && product.variants.sizes.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-2">
                    Select Size / Measurement
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                          selectedSize === size
                            ? "bg-tgs-black text-ivory border-tgs-black shadow-xs"
                            : "bg-ivory border-border-tgs text-tgs-black hover:border-olive/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant Choices: Colors */}
              {product.variants?.colors && product.variants.colors.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-2">
                    Select Finish / Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                          selectedColor === color
                            ? "bg-tgs-black text-ivory border-tgs-black shadow-xs"
                            : "bg-ivory border-border-tgs text-tgs-black hover:border-olive/50"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-xl border border-border-tgs bg-ivory text-tgs-black font-semibold flex items-center justify-center hover:bg-beige"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-semibold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-xl border border-border-tgs bg-ivory text-tgs-black font-semibold flex items-center justify-center hover:bg-beige"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Specifications checklist */}
              <div className="space-y-2 mb-6 pt-4 border-t border-border-tgs/60">
                {product.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary">
                    <CheckCircle2 className="w-3.5 h-3.5 text-olive shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-border-tgs space-y-4">
              <button
                onClick={handleRequestItem}
                className="w-full py-4 px-6 rounded-full bg-tgs-black text-ivory text-xs font-bold uppercase tracking-wider hover:bg-olive transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>Request This Item</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Delivery and Guarantee notes */}
              <div className="grid grid-cols-2 gap-3 text-[11px] text-text-secondary pt-2">
                <div className="flex items-center gap-2">
                  <Plane className="w-4 h-4 text-olive shrink-0" />
                  <span>{product.deliveryEstimate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-olive shrink-0" />
                  <span>100% Original with receipt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
