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
    let filteredData: ProductType[] = [...tempProducts];
  
    if (multipleFilters.brand.includes(true)) {
      filteredData = filteredData.filter((product) => {
        return (
          (multipleFilters.brand[0] && product.productName === "Incredible Frozen Table") ||
          (multipleFilters.brand[1] && product.productName === "Tasty Wooden Car")
        );
      });
    }
  
    if (multipleFilters.rating.includes(true)) {
      const ratingsFilter = multipleFilters.rating.map((value, index) => value ? index + 1 : null).filter(Boolean);
      if (ratingsFilter.length > 0) {
        filteredData = filteredData.filter((product) => ratingsFilter.includes(product.productRating));
      }
    }
  
    if (multipleFilters.price[0]) {
      filteredData = filteredData.filter((product) => product.productDisPrice < 500);
    }
  
    if (multipleFilters.price[1]) {
      filteredData = filteredData.filter((product) => product.productDisPrice >= 1000 && product.productDisPrice <= 3000);
    }
  
    setProducts(filteredData.length > 0 ? filteredData : tempProducts);
  }, [multipleFilters, tempProducts]);
  

  console.log(multipleFilters);

  return (
    <div className="products_page">
      <ProductsNavBar />
      <h2>Search Results</h2>
      <div className="filter_and_result_container">
        <div className="filter_container">
          <div className="">
            <div
              onClick={() => setShowBrandFilter((prev) => !prev)}
              className="dropdown_container"
            >
              <div className="filter_title">BRAND</div>
              {showBrandFilter ? (
                <BiChevronUp size={24} />
              ) : (
                <BiChevronDown size={24} />
              )}
            </div>
            {showBrandFilter && (
              <div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={multipleFilters.brand[0]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.brand];
                      updatedFilter[0] = !updatedFilter[0];
                      setMultipleFilters({
                        ...multipleFilters,
                        brand: updatedFilter,
                      });
                    }}
                  />
                  <label>Incredible Frozen Table</label>
                </div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={multipleFilters.brand[1]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.brand];
                      updatedFilter[1] = !updatedFilter[1];
                      setMultipleFilters({
                        ...multipleFilters,
                        brand: updatedFilter,
                      });
                    }}
                  />
                  <label>Tasty Wooden Car</label>
                </div>
              </div>
            )}
          </div>
          <div className="filter_divider"></div>
          <div className="">
            <div
              onClick={() => setShowPriceFilter((prev) => !prev)}
              className="dropdown_container"
            >
              <div className="filter_title">PRICE RANGE</div>
              {showPriceFilter ? (
                <BiChevronUp size={24} />
              ) : (
                <BiChevronDown size={24} />
              )}
            </div>
            {showPriceFilter && (
              <div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={multipleFilters.price[0]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.price];
                      updatedFilter[0] = !updatedFilter[0];
                      setMultipleFilters({
                        ...multipleFilters,
                        price: updatedFilter,
                      });
                    }}
                  />
                  <label>Under 500</label>
                </div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={multipleFilters.price[1]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.price];
                      updatedFilter[1] = !updatedFilter[1];
                      setMultipleFilters({
                        ...multipleFilters,
                        price: updatedFilter,
                      });
                    }}
                  />
                  <label>1000 to 3000</label>
                </div>
              </div>
            )}
          </div>
          <div className="filter_divider"></div>
          <div className="">
            <div
              onClick={() => setShowRatingFilter((prev) => !prev)}
              className="dropdown_container"
            >
              <div className="filter_title">RATINGS</div>
              {showRatingFilter ? (
                <BiChevronUp size={24} />
              ) : (
                <BiChevronDown size={24} />
              )}
            </div>
            {showRatingFilter && (
              <div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={multipleFilters.rating[4]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.rating];
                      updatedFilter[4] = !updatedFilter[4];
                      setMultipleFilters({
                        ...multipleFilters,
                        rating: updatedFilter,
                      });
                    }}
                  />
                  <label>{ratingBox(5)}</label>
                </div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={multipleFilters.rating[3]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.rating];
                      updatedFilter[3] = !updatedFilter[3];
                      setMultipleFilters({
                        ...multipleFilters,
                        rating: updatedFilter,
                      });
                    }}
                  />
                  <label>{ratingBox(4)}</label>
                </div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={multipleFilters.rating[2]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.rating];
                      updatedFilter[2] = !updatedFilter[2];
                      setMultipleFilters({
                        ...multipleFilters,
                        rating: updatedFilter,
                      });
                    }}
                  />
                  <label>{ratingBox(3)}</label>
                </div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={multipleFilters.rating[1]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.rating];
                      updatedFilter[1] = !updatedFilter[1];
                      setMultipleFilters({
                        ...multipleFilters,
                        rating: updatedFilter,
                      });
                    }}
                  />
                  <label>{ratingBox(2)}</label>
                </div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={multipleFilters.rating[0]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.rating];
                      updatedFilter[0] = !updatedFilter[0];
                      setMultipleFilters({
                        ...multipleFilters,
                        rating: updatedFilter,
                      });
                    }}
                  />
                  <label>{ratingBox(1)}</label>
                </div>
              </div>
            )}
          </div>
        </div>
        <ProductsResults products={products} />
      </div>
    </div>
  );
};

export default Products;
