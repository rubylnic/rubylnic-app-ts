import ReactPaginate from "react-paginate";
import queryString from 'query-string';
import styles from './Pagination.module.scss'
import { useSearchParams } from 'react-router-dom'


type queryType = {
    limit: string
    skip: string
}
export const Pagination = ({ initialQuery }: { initialQuery: queryType }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const limit = searchParams.get('limit') ? searchParams.get('limit') : initialQuery.limit;
    const handlePageClick = (page) => {
        // const newQuery = queryString.stringify({ skip: page * Number(limit).toString(), limit });
        setSearchParams({
            skip: page * Number(limit).toString(),
            limit: 6
        })
    }
    return <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={({ selected }) => handlePageClick(selected)}
        pageRangeDisplayed={5}
        pageCount={10}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className={styles.Pagination}
        pageClassName={styles.Pagination__item}
        activeClassName={styles.Pagination__active}
        disabledClassName={styles.Pagination__disabled}
        previousClassName={styles.Pagination__arrow}
        nextClassName={styles.Pagination__arrow}
    />
}