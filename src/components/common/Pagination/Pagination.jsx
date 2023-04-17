import React, { useState } from 'react'
import styles from "./Pagination.module.css";


let Pagination= (props) => {
//    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);

//    let pages = []
//     for (let i = 1; i <= pagesCount; i++) {
//       pages.push(i);
//     }
//     let portionCount = Math.ceil(pagesCount / props.pageSize)
//     let [portionNumber, setPortionNumber] = useState(1)
//     let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
//     let rightPortionPageNumber = (portionNumber * portionSize)

    let pages = [];
    for (let i = 1; i <= 10; i++) {
      pages.push(i);
    }
  
    return (
        <div>
          {pages.map((p) => {
            return (
              <span
                className={props.currentPage === p ? styles.selectedPage : ""}
                onClick={(e) => {
                  props.onPageChanged(p);
                }}
              >
                {p}
              </span>
            )})}
            </div>)
}
        

export default Pagination