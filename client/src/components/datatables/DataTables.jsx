import React, { useState } from "react";
import { Table, Button, Form, Pagination, Dropdown, Badge } from "react-bootstrap";
import {
    faPenToSquare,
    faPlus,
    faTrash,
    faAngleLeft,
    faAngleRight,
    faAnglesLeft,
    faAnglesRight,
    faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import {
    faAddressBook
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./DataTables.css"; // Add custom styling here

export const DataTables = () => {
    const [data, setData] = useState([
        { "id": 1, "name": "Alice Johnson", "email": "alice.johnson@example.com", "date": "01/01/2020", "salary": "$50000", "status": "Professional" },
        { "id": 2, "name": "Bob Smith", "email": "bob.smith@example.com", "date": "02/02/2020", "salary": "$60000", "status": "Applied" },
        { "id": 3, "name": "Cathy Brown", "email": "cathy.brown@example.com", "date": "03/03/2020", "salary": "$55000", "status": "Current" },
        { "id": 4, "name": "David Wilson", "email": "david.wilson@example.com", "date": "04/04/2020", "salary": "$45000", "status": "Active" },
        { "id": 5, "name": "Eva Green", "email": "eva.green@example.com", "date": "05/05/2020", "salary": "$70000", "status": "Active" },
        { "id": 6, "name": "Frank Moore", "email": "frank.moore@example.com", "date": "06/06/2020", "salary": "$52000", "status": "Resigned" },
        { "id": 7, "name": "Grace Lee", "email": "grace.lee@example.com", "date": "07/07/2020", "salary": "$48000", "status": "Applied" },
        { "id": 8, "name": "Hank Taylor", "email": "hank.taylor@example.com", "date": "08/08/2020", "salary": "$56000", "status": "Rejected" },
        { "id": 9, "name": "Ivy Anderson", "email": "ivy.anderson@example.com", "date": "09/09/2020", "salary": "$59000", "status": "Resigned" },
        { "id": 10, "name": "Jack Thomas", "email": "jack.thomas@example.com", "date": "10/10/2020", "salary": "$65000", "status": "Applied" },
        { "id": 11, "name": "Kathy Robinson", "email": "kathy.robinson@example.com", "date": "11/11/2020", "salary": "$57000", "status": "Active" },
        { "id": 12, "name": "Leo Clark", "email": "leo.clark@example.com", "date": "12/12/2020", "salary": "$62000", "status": "Professional" },
        { "id": 13, "name": "Mia Lewis", "email": "mia.lewis@example.com", "date": "01/13/2021", "salary": "$53000", "status": "Current" },
        { "id": 14, "name": "Noah Walker", "email": "noah.walker@example.com", "date": "02/14/2021", "salary": "$58000", "status": "Active" },
        { "id": 15, "name": "Olivia Hall", "email": "olivia.hall@example.com", "date": "03/15/2021", "salary": "$61000", "status": "Resigned" },
        { "id": 16, "name": "Paul Allen", "email": "paul.allen@example.com", "date": "04/16/2021", "salary": "$64000", "status": "Professional" },
        { "id": 17, "name": "Quinn Young", "email": "quinn.young@example.com", "date": "05/17/2021", "salary": "$57000", "status": "Active" },
        { "id": 18, "name": "Rachel King", "email": "rachel.king@example.com", "date": "06/18/2021", "salary": "$49000", "status": "Resigned" },
        { "id": 19, "name": "Steve Wright", "email": "steve.wright@example.com", "date": "07/19/2021", "salary": "$52000", "status": "Applied" },
        { "id": 20, "name": "Tina Scott", "email": "tina.scott@example.com", "date": "08/20/2021", "salary": "$45000", "status": "Rejected" },
        { "id": 21, "name": "Uma Torres", "email": "uma.torres@example.com", "date": "09/21/2021", "salary": "$54000", "status": "Resigned" },
        { "id": 22, "name": "Vince Nguyen", "email": "vince.nguyen@example.com", "date": "10/22/2021", "salary": "$62000", "status": "Active" },
        { "id": 23, "name": "Wendy Patel", "email": "wendy.patel@example.com", "date": "11/23/2021", "salary": "$59000", "status": "Active" },
        { "id": 24, "name": "Xander Carter", "email": "xander.carter@example.com", "date": "12/24/2021", "salary": "$66000", "status": "Resigned" },
        { "id": 25, "name": "Yara Rodriguez", "email": "yara.rodriguez@example.com", "date": "01/25/2022", "salary": "$53000", "status": "Professional" },
        { "id": 26, "name": "Zoe Martinez", "email": "zoe.martinez@example.com", "date": "02/26/2022", "salary": "$60000", "status": "Current" },
        { "id": 27, "name": "Aaron Hernandez", "email": "aaron.hernandez@example.com", "date": "03/27/2022", "salary": "$58000", "status": "Resigned" },
        { "id": 28, "name": "Bella Lopez", "email": "bella.lopez@example.com", "date": "04/28/2022", "salary": "$52000", "status": "Rejected" },
        { "id": 29, "name": "Cameron Cook", "email": "cameron.cook@example.com", "date": "05/29/2022", "salary": "$62000", "status": "Active" },
        { "id": 30, "name": "Diana Adams", "email": "diana.adams@example.com", "date": "06/30/2022", "salary": "$55000", "status": "Professional" },
        { "id": 31, "name": "Ethan Bell", "email": "ethan.bell@example.com", "date": "07/31/2022", "salary": "$67000", "status": "Active" },
        { "id": 32, "name": "Fiona Lee", "email": "fiona.lee@example.com", "date": "08/31/2022", "salary": "$64000", "status": "Active" },
        { "id": 33, "name": "George Kim", "email": "george.kim@example.com", "date": "09/31/2022", "salary": "$72000", "status": "Resigned" },
        { "id": 34, "name": "Holly Perez", "email": "holly.perez@example.com", "date": "10/31/2022", "salary": "$59000", "status": "Applied" },
        { "id": 35, "name": "Isaac Brown", "email": "isaac.brown@example.com", "date": "11/31/2022", "salary": "$50000", "status": "Active" },
        { "id": 36, "name": "Julia Clark", "email": "julia.clark@example.com", "date": "12/31/2022", "salary": "$68000", "status": "Resigned" },
        { "id": 37, "name": "Kyle White", "email": "kyle.white@example.com", "date": "01/31/2023", "salary": "$55000", "status": "Rejected" },
        { "id": 38, "name": "Laura Johnson", "email": "laura.johnson@example.com", "date": "02/31/2023", "salary": "$61000", "status": "Current" },
        { "id": 39, "name": "Mark Harris", "email": "mark.harris@example.com", "date": "03/31/2023", "salary": "$59000", "status": "Resigned" },
        { "id": 40, "name": "Nina Evans", "email": "nina.evans@example.com", "date": "04/31/2023", "salary": "$65000", "status": "Professional" },
        { "id": 41, "name": "Oscar Lee", "email": "oscar.lee@example.com", "date": "05/31/2023", "salary": "$52000", "status": "Active" },
        { "id": 42, "name": "Paula Wright", "email": "paula.wright@example.com", "date": "06/31/2023", "salary": "$58000", "status": "Resigned" },
        { "id": 43, "name": "Quincy Young", "email": "quincy.young@example.com", "date": "07/31/2023", "salary": "$65000", "status": "Active" },
        { "id": 44, "name": "Rachel Adams", "email": "rachel.adams@example.com", "date": "08/31/2023", "salary": "$70000", "status": "Professional" },
        { "id": 45, "name": "Samuel Baker", "email": "samuel.baker@example.com", "date": "09/31/2023", "salary": "$61000", "status": "Resigned" },
        { "id": 46, "name": "Tara Hall", "email": "tara.hall@example.com", "date": "10/31/2023", "salary": "$59000", "status": "Rejected" },
        { "id": 47, "name": "Ursula Lee", "email": "ursula.lee@example.com", "date": "11/31/2023", "salary": "$54000", "status": "Active" },
        { "id": 48, "name": "Victor King", "email": "victor.king@example.com", "date": "12/31/2023", "salary": "$68000", "status": "Resigned" },
        { "id": 49, "name": "Wanda Scott", "email": "wanda.scott@example.com", "date": "01/01/2024", "salary": "$60000", "status": "Current" },
        { "id": 50, "name": "Xena Green", "email": "xena.green@example.com", "date": "02/01/2024", "salary": "$62000", "status": "Applied" },
        { "id": 51, "name": "Yvonne Moore", "email": "yvonne.moore@example.com", "date": "03/01/2024", "salary": "$59000", "status": "Resigned" },
        { "id": 52, "name": "Zachary Evans", "email": "zachary.evans@example.com", "date": "04/01/2024", "salary": "$55000", "status": "Professional" },
        { "id": 53, "name": "Ava Martin", "email": "ava.martin@example.com", "date": "05/01/2024", "salary": "$64000", "status": "Active" },
        { "id": 54, "name": "Ben Lewis", "email": "ben.lewis@example.com", "date": "06/01/2024", "salary": "$67000", "status": "Resigned" },
        { "id": 55, "name": "Clara Johnson", "email": "clara.johnson@example.com", "date": "07/01/2024", "salary": "$60000", "status": "Professional" },
        { "id": 56, "name": "Derek Taylor", "email": "derek.taylor@example.com", "date": "08/01/2024", "salary": "$58000", "status": "Rejected" },
        { "id": 57, "name": "Elena Rodriguez", "email": "elena.rodriguez@example.com", "date": "09/01/2024", "salary": "$50000", "status": "Current" },
        { "id": 58, "name": "Franklin King", "email": "franklin.king@example.com", "date": "10/01/2024", "salary": "$72000", "status": "Active" },
        { "id": 59, "name": "Gina Carter", "email": "gina.carter@example.com", "date": "11/01/2024", "salary": "$68000", "status": "Active" },
        { "id": 60, "name": "Henry Lee", "email": "henry.lee@example.com", "date": "12/01/2024", "salary": "$55000", "status": "Resigned" },
        { "id": 61, "name": "Isabella Young", "email": "isabella.young@example.com", "date": "01/01/2025", "salary": "$62000", "status": "Active" },
        { "id": 62, "name": "Jackie Wright", "email": "jackie.wright@example.com", "date": "02/01/2025", "salary": "$60000", "status": "Active" },
        { "id": 63, "name": "Kevin Baker", "email": "kevin.baker@example.com", "date": "03/01/2025", "salary": "$59000", "status": "Resigned" },
        { "id": 64, "name": "Lily Scott", "email": "lily.scott@example.com", "date": "04/01/2025", "salary": "$68000", "status": "ActiCurrentve" },
        { "id": 65, "name": "Michael Adams", "email": "michael.adams@example.com", "date": "05/01/2025", "salary": "$62000", "status": "Applied" },
        { "id": 66, "name": "Nora Johnson", "email": "nora.johnson@example.com", "date": "06/01/2025", "salary": "$55000", "status": "Applied" },
        { "id": 67, "name": "Oscar Garcia", "email": "oscar.garcia@example.com", "date": "07/01/2025", "salary": "$70000", "status": "Professional" },
        { "id": 68, "name": "Penny Martinez", "email": "penny.martinez@example.com", "date": "08/01/2025", "salary": "$60000", "status": "Rejected" },
        { "id": 69, "name": "Quinn Robinson", "email": "quinn.robinson@example.com", "date": "09/01/2025", "salary": "$68000", "status": "Professional" },
        { "id": 70, "name": "Ricky Lee", "email": "ricky.lee@example.com", "date": "10/01/2025", "salary": "$54000", "status": "Active" },
        { "id": 71, "name": "Samantha Kim", "email": "samantha.kim@example.com", "date": "11/01/2025", "salary": "$62000", "status": "Rejected" },
        { "id": 72, "name": "Tony Green", "email": "tony.green@example.com", "date": "12/01/2025", "salary": "$59000", "status": "Resigned" },
        { "id": 73, "name": "Uma Torres", "email": "uma.torres@example.com", "date": "01/01/2026", "salary": "$61000", "status": "Active" },
        { "id": 74, "name": "Victor Carter", "email": "victor.carter@example.com", "date": "02/01/2026", "salary": "$57000", "status": "Active" },
        { "id": 75, "name": "Wanda Wilson", "email": "wanda.wilson@example.com", "date": "03/01/2026", "salary": "$64000", "status": "Current" },
        { "id": 76, "name": "Xander Thomas", "email": "xander.thomas@example.com", "date": "04/01/2026", "salary": "$60000", "status": "Active" },
        { "id": 77, "name": "Yara Martinez", "email": "yara.martinez@example.com", "date": "05/01/2026", "salary": "$68000", "status": "Professional" },
        { "id": 78, "name": "Zane Walker", "email": "zane.walker@example.com", "date": "06/01/2026", "salary": "$62000", "status": "Resigned" },
        { "id": 79, "name": "Aaron Kim", "email": "aaron.kim@example.com", "date": "07/01/2026", "salary": "$60000", "status": "Rejected" },
        { "id": 80, "name": "Bella Torres", "email": "bella.torres@example.com", "date": "08/01/2026", "salary": "$55000", "status": "Applied" },
        { "id": 81, "name": "Charlie Johnson", "email": "charlie.johnson@example.com", "date": "09/01/2026", "salary": "$68000", "status": "Applied" },
        { "id": 82, "name": "Diana Green", "email": "diana.green@example.com", "date": "10/01/2026", "salary": "$59000", "status": "Rejected" },
        { "id": 83, "name": "Elijah Brown", "email": "elijah.brown@example.com", "date": "11/01/2026", "salary": "$65000", "status": "Rejected" },
        { "id": 84, "name": "Fiona Adams", "email": "fiona.adams@example.com", "date": "12/01/2026", "salary": "$70000", "status": "Resigned" },
        { "id": 85, "name": "Graham Lee", "email": "graham.lee@example.com", "date": "01/01/2027", "salary": "$54000", "status": "Current" },
        { "id": 86, "name": "Holly Wright", "email": "holly.wright@example.com", "date": "02/01/2027", "salary": "$68000", "status": "Active" },
        { "id": 87, "name": "Iris Young", "email": "iris.young@example.com", "date": "03/01/2027", "salary": "$60000", "status": "Resigned" },
        { "id": 88, "name": "James King", "email": "james.king@example.com", "date": "04/01/2027", "salary": "$59000", "status": "Active" },
        { "id": 89, "name": "Kendra Harris", "email": "kendra.harris@example.com", "date": "05/01/2027", "salary": "$62000", "status": "Professional" },
        { "id": 90, "name": "Leo Martinez", "email": "leo.martinez@example.com", "date": "06/01/2027", "salary": "$55000", "status": "Applied" },
        { "id": 91, "name": "Molly Brown", "email": "molly.brown@example.com", "date": "07/01/2027", "salary": "$61000", "status": "Rejected" },
        { "id": 92, "name": "Nick Scott", "email": "nick.scott@example.com", "date": "08/01/2027", "salary": "$57000", "status": "Active" },
        { "id": 93, "name": "Olivia Wilson", "email": "olivia.wilson@example.com", "date": "09/01/2027", "salary": "$68000", "status": "Resigned" },
        { "id": 94, "name": "Peter Clark", "email": "peter.clark@example.com", "date": "10/01/2027", "salary": "$59000", "status": "Active" },
        { "id": 95, "name": "Quinn Young", "email": "quinn.young@example.com", "date": "11/01/2027", "salary": "$60000", "status": "Rejected" },
        { "id": 96, "name": "Rebecca Hall", "email": "rebecca.hall@example.com", "date": "12/01/2027", "salary": "$55000", "status": "Resigned" },
        { "id": 97, "name": "Sam Rodriguez", "email": "sam.rodriguez@example.com", "date": "01/01/2028", "salary": "$64000", "status": "Applied" },
        { "id": 98, "name": "Tina Lopez", "email": "tina.lopez@example.com", "date": "02/01/2028", "salary": "$67000", "status": "Applied" },
        { "id": 99, "name": "Uma Patel", "email": "uma.patel@example.com", "date": "03/01/2028", "salary": "$59000", "status": "Resigned" },
        { "id": 100, "name": "Vince Carter", "email": "vince.carter@example.com", "date": "04/01/2028", "salary": "$60000", "status": "Active" }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allVisibleItems = filteredData.slice(indexOfFirstItem, indexOfLastItem).map(item => item.id);
            setSelectedEntries(allVisibleItems);
        } else {
            setSelectedEntries([]);
        }
    };

    const handleSelectItem = (id) => {
        if (selectedEntries.includes(id)) {
            setSelectedEntries(selectedEntries.filter(item => item !== id));
        } else {
            setSelectedEntries([...selectedEntries, id]);
        }
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const getInitials = (name) => {
        const initials = name.split(" ").map(n => n[0]).join("");
        return initials;
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);

        // Nếu chỉ có 1 trang, không cần hiển thị phân trang
        if (totalPages <= 1) return null;

        const paginationItems = [];
        const addPageButton = (pageNumber) => (
            <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => setCurrentPage(pageNumber)}
            >
                {pageNumber}
            </Pagination.Item>
        );

        // Thêm nút 'First' và 'Previous'
        paginationItems.push(
            <Pagination.First
                key="first"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
            />,
            <Pagination.Prev
                key="prev"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
            />
        );

        if (totalPages <= 7) {
            // Hiển thị tất cả các trang nếu số trang <= 7
            for (let i = 1; i <= totalPages; i++) {
                paginationItems.push(addPageButton(i));
            }
        } else {
            // Hiển thị phân trang với dấu `...`
            if (currentPage <= 4) {
                // Trường hợp trang hiện tại nằm trong khoảng 1 - 4
                for (let i = 1; i <= 5; i++) {
                    paginationItems.push(addPageButton(i));
                }
                paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
                paginationItems.push(addPageButton(totalPages));
            } else if (currentPage >= totalPages - 3) {
                // Trường hợp trang hiện tại nằm trong khoảng cuối (totalPages - 3 đến totalPages)
                paginationItems.push(addPageButton(1));
                paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    paginationItems.push(addPageButton(i));
                }
            } else {
                // Trường hợp trang hiện tại ở giữa
                paginationItems.push(addPageButton(1));
                paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
                paginationItems.push(addPageButton(currentPage - 1));
                paginationItems.push(addPageButton(currentPage));
                paginationItems.push(addPageButton(currentPage + 1));
                paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
                paginationItems.push(addPageButton(totalPages));
            }
        }

        // Thêm nút 'Next' và 'Last'
        paginationItems.push(
            <Pagination.Next
                key="next"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            />,
            <Pagination.Last
                key="last"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
            />
        );

        return <Pagination>{paginationItems}</Pagination>;
    };


    const renderPagination0 = () => {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);

        if (totalPages <= 1) return null;

        const paginationItems = [];
        const addPageButton = (pageNumber) => (
            <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => setCurrentPage(pageNumber)}
            >
                {pageNumber}
            </Pagination.Item>
        );

        // Thêm nút 'First' và 'Previous' với Font Awesome icons
        paginationItems.push(
            <Pagination.First
                key="first"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faAnglesLeft} /> {/* << */}
            </Pagination.First>,

            <Pagination.Prev
                key="prev"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faAngleLeft} /> {/* < */}
            </Pagination.Prev>
        );

        // Nếu đang ở các trang đầu (1-3), hiển thị 5 trang đầu và trang cuối cùng
        if (currentPage <= 3) {
            for (let i = 1; i <= Math.min(5, totalPages); i++) {
                paginationItems.push(addPageButton(i));
            }
            if (totalPages > 5) {
                paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled>
                    <FontAwesomeIcon icon={faEllipsis} /> {/* ... */}
                </Pagination.Ellipsis>);
                paginationItems.push(addPageButton(totalPages));
            }
        }
        // Nếu đang ở các trang cuối (từ totalPages - 2 trở lên), hiển thị 5 trang cuối và trang đầu tiên
        else if (currentPage >= totalPages - 2) {
            paginationItems.push(addPageButton(1));
            paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" disabled>
                <FontAwesomeIcon icon={faEllipsis} /> {/* ... */}
            </Pagination.Ellipsis>);
            for (let i = totalPages - 4; i <= totalPages; i++) {
                paginationItems.push(addPageButton(i));
            }
        }
        // Nếu đang ở giữa (trang 4 đến totalPages - 3), hiển thị trang đầu, ... trang hiện tại, và dấu ... cuối
        else {
            paginationItems.push(addPageButton(1)); // Trang đầu tiên
            paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" disabled>
                <FontAwesomeIcon icon={faEllipsis} /> {/* ... */}
            </Pagination.Ellipsis>);

            const startPage = currentPage - 1; // Trang trước
            const endPage = currentPage + 1;   // Trang sau

            for (let i = startPage; i <= endPage; i++) {
                paginationItems.push(addPageButton(i));
            }

            paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled>
                <FontAwesomeIcon icon={faEllipsis} /> {/* ... */}
            </Pagination.Ellipsis>);
            paginationItems.push(addPageButton(totalPages)); // Trang cuối cùng
        }

        // Thêm nút 'Next' và 'Last' với Font Awesome icons
        paginationItems.push(
            <Pagination.Next
                key="next"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}>
                <FontAwesomeIcon icon={faAngleRight} /> {/* > */}
            </Pagination.Next>,

            <Pagination.Last
                key="last"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}>
                <FontAwesomeIcon icon={faAnglesRight} /> {/* >> */}
            </Pagination.Last>
        );

        return <Pagination style={{margin: 0}}>{paginationItems}</Pagination>;
    };


    const renderStatusBadge = (status) => {
        switch (status) {
            case "Professional":
                return <Badge bg="label-success">Professional</Badge>;
            case "Resigned":
                return <Badge bg="label-warning">Resigned</Badge>;
            case "Current":
                return <Badge bg="label-primary">Current</Badge>;
            case "Applied":
                return <Badge bg="label-info">Applied</Badge>;
            case "Rejected":
                return <Badge bg="label-danger">Rejected</Badge>;
            default:
                return <Badge bg="label-secondary">{status}</Badge>;
        }
    };

    return (
        <div className="card">
            <div className="card-datatable table-responsive">
                <div className="dataTables_wrapper dt-bootstrap5 no-footer">
                    <div className="card-header flex-column flex-md-row pb-0">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="head-label text-center">
                                <h5 className="card-title mb-0">DataTable de Japtor</h5>
                            </div>
                            <div className="dt-action-buttons text-end pt-6 pt-md-0">
                                <div className="dt-buttons btn-group flex-wrap">
                                    <div className="btn-group">
                                        <Dropdown className="me-3">
                                            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                                                Export
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">Export as CSV</Dropdown.Item>
                                                <Dropdown.Item href="#">Export as PDF</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div>
                                        <Button variant="primary" type="button" className="btn btn-secondary create-new btn-primary" style={{ display: "flex", textAlign: "center" }}>
                                            <FontAwesomeIcon icon={faPlus} style={{ marginRight: 10 }} />
                                            Add New Record
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-12 col-md-6">
                                <div className="dataTables_length">
                                    <label style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                        <span>Show</span>
                                        <select
                                            name="DataTables_Table_0_length"
                                            aria-controls="DataTables_Table_0"
                                            className="form-select ms-3 me-3"
                                            style={{ width: "80px" }}
                                            onChange={handleItemsPerPageChange}
                                            value={itemsPerPage}
                                        >
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                        </select>
                                        <span>entries</span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end mt-n6 mt-md-0">
                                {/* <div className="datatable-controls">
                            </div> */}
                                <Form.Control
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    style={{ width: "295px" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Table striped bordered hover responsive className="datatable">
                    <thead>
                        <tr>
                            <th>
                                <Form.Check
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedEntries.length === currentItems.length && currentItems.length > 0}
                                />
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Salary</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={selectedEntries.includes(item.id)}
                                        onChange={() => handleSelectItem(item.id)}
                                    />
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-circle me-2">
                                            {getInitials(item.name)}
                                        </div>
                                        <div>
                                            {item.name}
                                        </div>
                                    </div>
                                </td>
                                <td>{item.email}</td>
                                <td>{item.date}</td>
                                <td>{item.salary}</td>
                                <td>{renderStatusBadge(item.status)}</td>
                                <td>
                                    <Button variant="link"><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                    <Button variant="link"><FontAwesomeIcon icon={faTrash} /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="card-footer flex-column flex-md-row pb-0 pb-4">
                    <div className="row">
                        <div className="col-sm-12 col-md-6" style={{display: "flex"}}>
                            {/*<div className="dataTables_info" style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>*/}
                            {/*    <div className="text-center mt-2">*/}
                            {/*        Showing {currentItems.length} of {filteredData.length} entries*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="dataTables_info"
                                 style={{display: "flex", justifyContent: "left", alignItems: "center"}}>
                                <div className="text-center mt-2">
                                    {/* Calculate starting and ending entries */}
                                    {`Showing entries from ${indexOfFirstItem + 1} to ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} entries`}
                                </div>
                            </div>
                            <div className="ms-2 me-2"></div>
                            <div className="dataTables_select"
                                 style={{display: "flex", justifyContent: "left", alignItems: "center"}}>
                                <div className="text-center mt-2">
                                    Selected {selectedEntries.length} entries
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-sm-12 col-md-6">
                            <div className="dataTables_paginate paging_simple_numbers" style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                                <Pagination className="d-flex justify-content-center" style={{ margin: 0 }}>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <Pagination.Item
                                            key={index}
                                            active={index + 1 === currentPage}
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </Pagination.Item>
                                    ))}
                                </Pagination>
                            </div>
                        </div> */}

                        <div className="col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end">
                            {renderPagination()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const DataTabless = () => {
    const [data, setData] = useState([
        { name: "Glyn Giacoppo", email: "ggiacoppo2r@apache.org", date: "04/15/2021", salary: "$24973.48", status: "Professional" },
        { name: "Evangelina Carnock", email: "ecarnock2q@washington.edu", date: "01/26/2021", salary: "$23704.82", status: "Resigned" },
        { name: "Glyn Giacoppo", email: "ggiacoppo2r@apache.org", date: "04/15/2021", salary: "$24973.48", status: "Professional" },
        { name: "Evangelina Carnock", email: "ecarnock2q@washington.edu", date: "01/26/2021", salary: "$23704.82", status: "Resigned" },
        { name: "Olivette Gudgin", email: "ogudgin2p@gizmodo.com", date: "04/09/2021", salary: "$15211.60", status: "Professional" },
        { name: "Reina Peckett", email: "rpeckett2o@timesonline.co.uk", date: "05/20/2021", salary: "$16619.40", status: "Resigned" },
        { name: "Alaric Beslier", email: "abeslier2n@zimbio.com", date: "04/16/2021", salary: "$19366.53", status: "Rejected" },
        { name: "Edwina Ebsworth", email: "eebsworth2m@sbwire.com", date: "09/27/2021", salary: "$19586.23", status: "Current" },
        { name: "Ronica Hasted", email: "rhasted2l@hexun.com", date: "07/04/2021", salary: "$24866.66", status: "Resigned" },
        { name: "Glyn Giacoppo", email: "ggiacoppo2r@apache.org", date: "04/15/2021", salary: "$24973.48", status: "Professional" },
        { name: "Evangelina Carnock", email: "ecarnock2q@washington.edu", date: "01/26/2021", salary: "$23704.82", status: "Resigned" },
        { name: "Olivette Gudgin", email: "ogudgin2p@gizmodo.com", date: "04/09/2021", salary: "$15211.60", status: "Professional" },
        { name: "Reina Peckett", email: "rpeckett2o@timesonline.co.uk", date: "05/20/2021", salary: "$16619.40", status: "Resigned" },
        { name: "Alaric Beslier", email: "abeslier2n@zimbio.com", date: "04/16/2021", salary: "$19366.53", status: "Resigned" },
        { name: "Edwina Ebsworth", email: "eebsworth2m@sbwire.com", date: "09/27/2021", salary: "$19586.23", status: "Current" },
        { name: "Ronica Hasted", email: "rhasted2l@hexun.com", date: "07/04/2021", salary: "$24866.66", status: "Rejected" },
        { name: "Glyn Giacoppo", email: "ggiacoppo2r@apache.org", date: "04/15/2021", salary: "$24973.48", status: "Professional" },
        { name: "Evangelina Carnock", email: "ecarnock2q@washington.edu", date: "01/26/2021", salary: "$23704.82", status: "Resigned" },
        { name: "Olivette Gudgin", email: "ogudgin2p@gizmodo.com", date: "04/09/2021", salary: "$15211.60", status: "Professional" },
        { name: "Reina Peckett", email: "rpeckett2o@timesonline.co.uk", date: "05/20/2021", salary: "$16619.40", status: "Rejected" },
        { name: "Alaric Beslier", email: "abeslier2n@zimbio.com", date: "04/16/2021", salary: "$19366.53", status: "Resigned" },
        { name: "Edwina Ebsworth", email: "eebsworth2m@sbwire.com", date: "09/27/2021", salary: "$19586.23", status: "Current" },
        { name: "Ronica Hasted", email: "rhasted2l@hexun.com", date: "07/04/2021", salary: "$24866.66", status: "Resigned" },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allVisibleItems = filteredData.slice(indexOfFirstItem, indexOfLastItem).map(item => item.email);
            setSelectedEntries(allVisibleItems);
        } else {
            setSelectedEntries([]);
        }
    };

    const handleSelectItem = (email) => {
        if (selectedEntries.includes(email)) {
            setSelectedEntries(selectedEntries.filter(item => item !== email));
        } else {
            setSelectedEntries([...selectedEntries, email]);
        }
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const getInitials = (name) => {
        const initials = name.split(" ").map(n => n[0]).join("");
        return initials;
    };

    const renderStatusBadge = (status) => {
        switch (status) {
            case "Professional":
                return <Badge bg="label-success">Professional</Badge>;
            case "Resigned":
                return <Badge bg="label-warning">Resigned</Badge>;
            case "Current":
                return <Badge bg="label-primary">Current</Badge>;
            case "Rejected":
                return <Badge bg="label-danger">Rejected</Badge>;
            default:
                return <Badge bg="label-secondary">{status}</Badge>;
        }
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="card">
            <div className="card-datatable table-responsive">
                <div className="dataTables_wrapper dt-bootstrap5 no-footer">
                    <div className="card-header flex-column flex-md-row pb-0">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="head-label text-center">
                                <h5 className="card-title mb-0">DataTable</h5>
                            </div>
                            <div className="dt-action-buttons text-end pt-6 pt-md-0">
                                <div className="dt-buttons btn-group flex-wrap">
                                    <Button variant="primary" type="button" className="btn btn-secondary create-new btn-primary" style={{ display: "flex", textAlign: "center" }}>
                                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: 10 }} />
                                        Add New Record
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-12 col-md-6">
                                <div className="dataTables_length">
                                    <label style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                        <span>Show</span>
                                        <select
                                            name="DataTables_Table_0_length"
                                            aria-controls="DataTables_Table_0"
                                            className="form-select ms-3 me-3"
                                            style={{ width: "80px" }}
                                            onChange={handleItemsPerPageChange}
                                            value={itemsPerPage}
                                        >
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                        </select>
                                        <span>entries</span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end mt-n6 mt-md-0">
                                <Form.Control
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    style={{ width: "290px" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Table striped bordered hover responsive className="datatable">
                    <thead>
                        <tr>
                            <th>
                                <Form.Check
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedEntries.length === currentItems.length && currentItems.length > 0}
                                />
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Salary</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={selectedEntries.includes(item.email)}
                                        onChange={() => handleSelectItem(item.email)}
                                    />
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-circle me-2">
                                            {getInitials(item.name)}
                                        </div>
                                        <div>
                                            {item.name}
                                        </div>
                                    </div>
                                </td>
                                <td>{item.email}</td>
                                <td>{item.date}</td>
                                <td>{item.salary}</td>
                                <td>{renderStatusBadge(item.status)}</td>
                                <td>
                                    <Button variant="link"><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                    <Button variant="link"><FontAwesomeIcon icon={faTrash} /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="card-footer flex-column flex-md-row pb-0 pb-4">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="dataTables_info" style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                <div className="text-center mt-2">
                                    {selectedEntries.length > 0
                                        ? `Selected ${selectedEntries.length} entries`
                                        : `Showing ${currentItems.length} of ${filteredData.length} entries`}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="dataTables_paginate paging_simple_numbers" style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                                <Pagination className="d-flex justify-content-center" style={{ margin: 0 }}>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <Pagination.Item
                                            key={index}
                                            active={index + 1 === currentPage}
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </Pagination.Item>
                                    ))}
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
