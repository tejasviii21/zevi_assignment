import React, { useState, useEffect } from "react";
import "./Products.scss";
import ProductsNavBar from "../components/ProductsNavBar";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import ProductsResults from "../components/ProductsResults";
import { ratingBox } from "../Utilities/utilities";
import { ProductType, fetchProducts } from "../FakerData/FakerData";

interface MultipleFilterType {
  brand: boolean[];
  rating: boolean[];
  price: boolean[];
}

const Products = () => {
  const [showBrandFilter, setShowBrandFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [products, setProducts] = useState<ProductType[]>(fetchProducts());
  const [multipleFilters, setMultipleFilters] = useState<MultipleFilterType>({
    brand: [false, false],
    price: [false, false],
    rating: [false, false, false, false, false],
  });

  const [tempProducts, setTempProducts] = useState<ProductType[]>(
    fetchProducts()
  );

  useEffect(() => {
    setProducts(fetchProducts());
    setTempProducts(fetchProducts());
  }, []);

  useEffect(() => {
    let filteredData: ProductType[] = [];

    const applyBrandFilter = multipleFilters.brand.includes(true);
    const applyRatingFilter = multipleFilters.rating.includes(true);
    const applyPriceFilter = multipleFilters.price.includes(true);

    if (applyBrandFilter || applyRatingFilter || applyPriceFilter) {
      filteredData = tempProducts.filter((product) => {
        let matchesBrand = true;
        let matchesRating = true;
        let matchesPrice = true;

        if (applyBrandFilter) {
          matchesBrand = multipleFilters.brand.every(
            (filter, index) => !filter || product.productName === ["Incredible Frozen Table", "Tasty Wooden Car"][index]
          );
        }

        if (applyRatingFilter) {
          matchesRating = multipleFilters.rating.some(
            (filter, index) => filter && product.productRating === index + 1
          );
        }

        if (applyPriceFilter) {
          const [under500, from1000to3000] = multipleFilters.price;
          matchesPrice =
            (under500 && product.productDisPrice < 500) ||
            (from1000to3000 &&
              product.productDisPrice >= 1000 &&
              product.productDisPrice <= 3000);
        }

        return matchesBrand && matchesRating && matchesPrice;
      });
    } else {
      filteredData = tempProducts;
    }

    setProducts(filteredData);
  }, [multipleFilters, tempProducts]);

  return (
    <div className="products_page">
      <ProductsNavBar />
      <h2>Search Results</h2>
      <div className="filter_and_result_container">
        {/* ... Your existing filter UI code ... */}
      </div>
      <ProductsResults products={products} />
    </div>
  );
};

export default Products;
