import { useState } from "react";
import "../../styles/pagination.css";
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [selectedNum, setSelectedNum] = useState(1)
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const activeElement = (number) => {
    paginate(number)
    setSelectedNum(number)
  }
  return (
    <div>
      <nav aria-label="...">
        <ul class="pagination pagination-sm">
        {pageNumbers.map((number) => (
                  <li className={selectedNum==number ? 'page-item active': 'page-item'} aria-current="page" key={number}>
                    <a onClick={() => activeElement(number)} className="page-link" href="#">
                        <span class="page-link">{number}</span>
                    </a>
                  </li>
                ))}

        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
