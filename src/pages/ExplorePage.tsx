import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search } from "lucide-react";
import { MOCK_PRODUCTS } from "../data/mockProducts";
import { siteConfig } from "../config/siteConfig";

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state
  const categoryParam = searchParams.get("category") || "all";
  const queryParam = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Keep in sync with URL
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", catId);
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      newParams.set("q", searchQuery.trim());
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams);
  };

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchCat =
        selectedCategory === "all" || product.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);

      return matchCat && matchQuery;
    }).sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      return 0; // default order
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-olive block mb-2">
            Dubai Sourcing Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-tgs-black mb-3">
            Explore Curated Sourcing
          </h1>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Discover popular luxury timepieces, ready-to-wear pieces, footwear, and cosmetics sourced from authorized Dubai boutiques.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-border-tgs p-4 mb-8 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product or brand..."
              className="w-full pl-10 pr-4 py-2 bg-ivory/60 rounded-xl border border-border-tgs text-xs sm:text-sm text-tgs-black placeholder:text-text-muted focus:ring-2 focus:ring-olive/40 focus:outline-none"
            />
          </form>

          {/* Sort By */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs text-text-secondary hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-ivory/60 rounded-xl border border-border-tgs text-xs text-tgs-black font-medium focus:ring-2 focus:ring-olive/40 focus:outline-none"
            >
              <option value="featured">Featured Curations</option>
              <option value="name-asc">Alphabetical (A - Z)</option>
              <option value="name-desc">Alphabetical (Z - A)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-tgs-black text-ivory shadow-xs"
                : "bg-white text-text-secondary border border-border-tgs hover:text-tgs-black"
            }`}
          >
            All Items ({MOCK_PRODUCTS.length})
          </button>

          {siteConfig.categories.map((cat) => {
            const count = MOCK_PRODUCTS.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-tgs-black text-ivory shadow-xs"
                    : "bg-white text-text-secondary border border-border-tgs hover:text-tgs-black"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-border-tgs overflow-hidden shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <Link
                    to={`/product/${product.id}`}
                    className="block relative aspect-square overflow-hidden bg-beige"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ivory/90 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-tgs-black border border-border-tgs">
                      {product.brand}
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div className="p-5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-olive block mb-1">
                      {product.categoryLabel}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="block font-serif text-lg font-medium text-tgs-black hover:text-olive transition-colors line-clamp-2 mb-2"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Price on request & Request Action */}
                <div className="p-5 pt-0 border-t border-border-tgs/40 mt-3">
                  <div className="flex items-center justify-between mb-3 pt-3">
                    <div>
                      <span className="text-[11px] text-text-muted block">Quotation:</span>
                      <span className="text-xs font-semibold text-tgs-black tracking-wide">
                        {product.priceNote}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="flex-1 py-2 px-3 text-center text-xs font-medium text-tgs-black bg-ivory hover:bg-beige rounded-xl border border-border-tgs transition-colors"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/request?productName=${encodeURIComponent(
                        product.name
                      )}&brand=${encodeURIComponent(
                        product.brand
                      )}&category=${product.category}&url=${encodeURIComponent(
                        product.referenceUrl || window.location.origin + "/product/" + product.id
                      )}`}
                      className="flex-1 py-2 px-3 text-center text-xs font-semibold text-ivory bg-tgs-black hover:bg-olive rounded-xl transition-colors shadow-xs"
                    >
                      Request This Item
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-border-tgs p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-beige text-olive flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-medium text-tgs-black mb-2">
              No matching products found
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mb-6">
              We couldn’t find an exact catalogue match for &quot;{searchQuery}&quot;. Remember: you can request ANY item available in Dubai by sharing a photo or link!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSearchParams({});
                }}
                className="px-5 py-2.5 rounded-full border border-border-tgs text-xs font-semibold text-tgs-black hover:bg-beige"
              >
                Clear Filters
              </button>
              <Link
                to={`/request?query=${encodeURIComponent(searchQuery)}`}
                className="px-6 py-2.5 rounded-full bg-tgs-black text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-olive"
              >
                Request Custom Sourcing
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
