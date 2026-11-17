function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <button
        className={selectedCategory === "all" ? "filter-btn selected" : "filter-btn"}
        onClick={() => onCategoryChange("all")}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedCategory === category
              ? "filter-btn selected"
              : "filter-btn"
          }
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;