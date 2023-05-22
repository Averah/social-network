import React, { useState } from "react";
import cn from "classnames";
import s from "./Pagination.module.css";
import { CustomContentButton } from "../../../UI/CustomContentButton/CustomContentButton";

let Pagination = (props) => {

  let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
  console.log(pagesCount);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let portionSize = 10;
  let portionCount = Math.ceil(pagesCount / props.pageSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={s.pagination}>
      {portionNumber > 1 && (
        <CustomContentButton className={s.paginationButton}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </CustomContentButton>
      )}

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <span
              className={cn(
                {
                  [s.selectedPage]: props.currentPage === p,
                },
                s.pageNumber
              )}
              key={p}
              onClick={(e) => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <CustomContentButton className={s.paginationButton}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </CustomContentButton>
      )}
    </div>
  );
};
export default Pagination;
