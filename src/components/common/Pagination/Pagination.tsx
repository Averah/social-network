import React, { useState } from "react";
import cn from "classnames";
import s from "./Pagination.module.css";
import { CustomContentButton } from "../../../UI/CustomContentButton/CustomContentButton";

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber:number) => void
}
const Pagination:React.FC<PropsType> = ({ totalItemsCount, pageSize, currentPage, onPageChanged }) => {


  let pagesCount = Math.ceil(totalItemsCount / pageSize);


  let pages:Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let portionSize = 10;
  let portionCount = Math.ceil(pagesCount / pageSize);
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
                  [s.selectedPage]: currentPage === p,
                },
                s.pageNumber
              )}
              key={p}
              onClick={(e) => {
                onPageChanged(p);
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
