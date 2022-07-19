import React, { useEffect, useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { filterActions } from "../../store/filterSlice";
const SortOptions = () => {
  const { modifiedProducts, view, filters } = useSelector(
    (state) => state.filters
  );
  const [sortedValue, setSortedValue] = useState("Low to high (price)");
  const dispatch = useDispatch();

  const handleSort = (e) => {
    setSortedValue(e.target.value);
  };

  useEffect(() => {
    dispatch(filterActions.sortProducts(sortedValue));
    // eslint-disable-next-line
  }, [sortedValue, modifiedProducts, filters]);

  return (
    <Wrapper>
      <div className="btn-container">
        <button
          onClick={() => dispatch(filterActions.changeView("grid"))}
          type="button"
          className={`${view === "grid" ? "active" : null}`}
        >
          <BsFillGridFill />
        </button>
        <button
          onClick={() => dispatch(filterActions.changeView("list"))}
          type="button"
          className={`${view === "grid" ? null : "active"}`}
        >
          <BsList />
        </button>
      </div>
      <p>{modifiedProducts.length} products found</p>
      <hr />
      <form>
        <label htmlFor="sort">Sort by</label>
        <select
          name="sort"
          id="sort"
          value={sortedValue}
          onChange={handleSort}
          className="sort-input"
        >
          <option value="Low to high (price)">Low to high (price)</option>
          <option value="High to low (price)">High to Low (price)</option>
          <option value="Name A-Z">Name A-Z</option>
          <option value="Name Z-A">Name Z-A</option>
        </select>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    border-radius: 20px;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    margin-left: 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`;

export default SortOptions;
