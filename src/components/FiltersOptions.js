import React, { useEffect } from "react";
import styled from "styled-components";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { filterActions } from "../store/filterSlice";

const FilterOptions = () => {
  const {
    filters: filterSelections,
    filters: {
      text,
      category,
      brand,
      color,
      minPrice,
      maxPrice,
      price,
      shipping,
    },
    allProducts,
  } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterActions.executeFilters());
  }, [filterSelections]);

  const categories = getUniqueValues(allProducts, "category");
  const company = getUniqueValues(allProducts, "brand");
  const colors = getUniqueValues(allProducts, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="Search"
              className="search-input"
              value={text}
              onChange={(e) =>
                dispatch(
                  filterActions.setFilters({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          {/* CATEGORY */}
          <div className="form-control">
            <h5>Category</h5>
            <div>
              {categories.map((c, i) => (
                <button
                  key={i}
                  className={`${
                    category === c.toLowerCase() ? "active" : null
                  }`}
                  onClick={(e) =>
                    dispatch(
                      filterActions.setFilters({
                        name: "category",
                        value: e.target.textContent,
                      })
                    )
                  }
                >
                  {c}
                </button>
              ))}
            </div>
            {/* BRAND */}
            <div className="form-control">
              <h5>Brand</h5>
              <select
                name="brand"
                id="brand"
                value={brand}
                onChange={(e) =>
                  dispatch(
                    filterActions.setFilters({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                className="company"
              >
                {company.map((c, i) => (
                  <option key={i} value={c}>
                    {c.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            {/* COLORS */}
            <div className="form-control">
              <h5>Colors</h5>
              <div className="colors">
                {colors.map((c, i) => {
                  if (c === "all") {
                    return (
                      <button
                        key={i}
                        name="color"
                        data-color="all"
                        onClick={(e) =>
                          dispatch(
                            filterActions.setFilters({
                              name: e.target.name,
                              value: e.target.dataset.color,
                            })
                          )
                        }
                        className={`${
                          color === "all" ? "all-btn active" : "all-btn"
                        }`}
                      >
                        All
                      </button>
                    );
                  }
                  return (
                    <button
                      type="button"
                      key={i}
                      name="color"
                      style={{ background: c }}
                      className={`${
                        color === c ? "color-btn active" : "color-btn"
                      }`}
                      data-color={c}
                      onClick={(e) =>
                        dispatch(
                          filterActions.setFilters({
                            name: e.target.name,
                            value: e.target.dataset.color,
                          })
                        )
                      }
                    >
                      {color === c ? <FaCheck /> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          {/* PRICE */}
          <div className="form-control">
            <h5>Price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              id="price"
              onChange={(e) =>
                dispatch(
                  filterActions.setFilters({
                    name: e.target.name,
                    value: +e.target.value,
                  })
                )
              }
              min={minPrice}
              max={maxPrice}
              value={price}
            />
          </div>
          {/* SHIPPING */}
          <div className="form-control shipping">
            <label htmlFor="shipping">Free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={(e) => {
                dispatch(
                  filterActions.setFilters({
                    name: e.target.name,
                    value: e.target.checked,
                  })
                );
              }}
            />
          </div>
          <button
            type="button"
            className="clear-btn"
            onClick={() => dispatch(filterActions.clearFilters())}
          >
            Clear All Filters
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    border-radius: 12px;
    outline: none;

    transition: transform 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:focus {
      transform: scaleX(1.1);
    }
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default FilterOptions;
