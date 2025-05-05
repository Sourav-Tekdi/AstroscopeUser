import React from 'react'
import { Link } from 'react-router-dom'

const Pagination = ({ page, lastPage, setPage, response, path }) => {
    // Generate page numbers for the pagination
    const pageNumbers = []

    // Always show page 1
    if (page > 3) {
        pageNumbers.push(
            <li key={1}>
                <Link to={`/${path}?page=1`} onClick={() => setPage(1)}>
                    1
                </Link>
            </li>
        )
        if (page > 4) {
            pageNumbers.push(<li className="as_disabled" key="ellipsis1"><span>...</span></li>)
        }
    }

    // Page numbers to the left of the current page
    for (let i = Math.max(1, page - 3); i < page; i++) {
        pageNumbers.push(
            <li key={i}>
                <Link to={`/${path}?page=${i}`} onClick={() => setPage(i)}>
                    {i}
                </Link>
            </li>
        )
    }

    // Current page
    pageNumbers.push(
        <li className="as_active" key={page}>
            <span>{page}</span>
        </li>
    )

    // Page numbers to the right of the current page
    for (let i = page + 1; i <= Math.min(page + 3, lastPage); i++) {
        pageNumbers.push(
            <li key={i}>
                <Link to={`/${path}?page=${i}`} onClick={() => setPage(i)}>
                    {i}
                </Link>
            </li>
        )
    }

    // Always show the last page if it's not the current page
    if (lastPage > page + 3) {
        if (lastPage > page + 4) {
            pageNumbers.push(<li className="as_disabled" key="ellipsis2"><span>...</span></li>)
        }
        pageNumbers.push(
            <li key={lastPage}>
                <Link to={`/${path}?page=${lastPage}`} onClick={() => setPage(lastPage)}>
                    {lastPage}
                </Link>
            </li>
        )
    }

    return (
        <div className="as_pagination as_padderTop50">
            <ul className="text-right">
                {/* Previous button */}
                <li className={`as_prev ${page === 1 ? 'as_disabled' : ''}`}>
                    {page > 1 ? (
                        <Link to={`/${path}?page=${page - 1}`} onClick={() => setPage(page - 1)}>
                            prev
                        </Link>
                    ) : (
                        <span>prev</span>
                    )}
                </li>

                {/* Page numbers */}
                {pageNumbers}

                {/* Next button */}
                <li className={`as_next ${page === lastPage ? 'as_disabled' : ''}`}>
                    {page < lastPage ? (
                        <Link to={`/${path}?page=${page + 1}`} onClick={() => setPage(page + 1)}>
                            next
                        </Link>
                    ) : (
                        <span>next</span>
                    )}
                </li>
            </ul>

            {/* Optional information display */}
            <div className="dataTables_info text-right" style={{ margin: '10px' }}>
                <p>
                    Showing {response.from} to {response.to} of {response.total} entries
                </p>
            </div>
        </div>
    )
}

export default Pagination
