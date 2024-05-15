import React, {useState} from 'react';
import Modal from "react-modal";
import {
    FaUtensils,
    FaFilm,
    FaPlane,
    FaShoppingCart,
    FaShoppingBasket,
    FaEllipsisH,
    FaEdit,
    FaTrash,
  } from "react-icons/fa";
import "./ExpenseList.css";

Modal.setAppElement("#root");

const icons = {
    Food: <FaUtensils />,
    Entertainment: <FaFilm />,
    Travel: <FaPlane />,
    Shopping: <FaShoppingCart />,
    Grocery: <FaShoppingBasket />,
    Others: <FaEllipsisH />,
};

const modalStyle = {

    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        maxWidth: "500px",
        background: "rgba(255, 255, 255, 0.6)",
        borderRadius: "10px",
        border: "border: 1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: " 0 8px 12px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
    },
};

function ExpenseList ({data, categories, updateExpensedata}) {
    const [isOpen, setIsOpen] = useState(false);
    const [currExpense, setCurrExpense] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPage = Math.ceil(data.length / itemsPerPage);

    const handleInputChange = (e, isExpense = true) => {
        const { name, value } = e.target;
        setCurrExpense((prevState) => ({ ...prevState, [name]: value }));
    };

    const getPageNumbers = () => {
        let start = Math.max(currentPage - 1, 1);
        let end = Math.min(start + 2, totalPage);
        if (currentPage > totalPage - 2) {
            start = Math.max(totalPage - 2, 1);
            end = totalPage;
        }
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const currPage = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPage));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    const getCategoryIcon = (category) => {
        return icons[category] || <FaEllipsisH />;
    };
    
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    const openModal = (expense) => {
        setIsOpen(true);
        setCurrExpense(expense);
    };
  
    // const closeModal = () => {
    //     setIsOpen(false);
    //     setCurrExpense({
    //         title: "",
    //         price: "",
    //         category: "",
    //         date: "",
    //     }); 
    // };

    const handleDelete = (id) => {
        const updatedExpense = data.filter((expense) => {
            return expense.id !== id;
        });
        updateExpensedata(updatedExpense);
    };

    // const handleEdit = (e) => {
    //     e.preventDefault();
    //     setIsOpen(false);
    // };


    const editExpense = (e) => {
        e.preventDefault();

        const expenseIndex = data.findIndex(
          (expense) => expense.id === currExpense.id
        );
    
        
        const updatedExpenses = [...data];

        if (expenseIndex !== -1) {
          updatedExpenses[expenseIndex] = {
            ...updatedExpenses[expenseIndex],
            ...currExpense,
          };
    
          updateExpensedata(updatedExpenses);
          setIsOpen(false);
        } else {
          console.log("Expense not found");
        }
      };

    return (
        <>
            <div className='container'>
                <h2 className='heading'>Recent Transaction</h2>
                <br />
                <div className='table-container'>
                    {data && data.map((item, index) => (
                        <div className='row-container' key = {index}>
                            <div className='icon-title-date'>
                                <div className='icon'>
                                    {React.cloneElement(getCategoryIcon(item.category), {
                                        className : 'icon-category',
                                    })}
                                </div>
                                <div className='title-date'>
                                    <div className='title'>{item.title}</div>
                                    <div className='date'>{formatDate(item.date)}</div>
                                </div>
                            </div>
                            <div className='edit-delete'>
                                <div className="expense-price"> ₹{parseInt(item.price,10).toString()}</div>
                                <button className='btn edit-btn' onClick={() => openModal(item)}>
                                    <FaEdit />
                                </button>
                                <button className='btn delete-btn' onClick={() => handleDelete(item.id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    <div className="pagination">
                    <button onClick={prevPage} disabled={currentPage === 1}>
                        &laquo;
                        </button>
                        {getPageNumbers().map((number) => (
                        <button
                            key={number}
                            onClick={() => currPage(number)}
                            className={currentPage === number ? "active" : ""}
                        >
                            {number}
                        </button>
                        ))}
                        <button onClick={nextPage} disabled={currentPage === totalPage}>
                        &raquo;
                        </button>
                    </div>
                </div>
            </div>


            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={modalStyle}
                contentLabel="Edit Expense"
            >
                <h2 className="modal-header">Edit Expense</h2>
                <form className="modal-form-expense" onSubmit={editExpense}>
                <input
                    name="title"
                    placeholder="Title"
                    value={currExpense.title}
                    onChange={handleInputChange}
                    requireds
                />

                <input
                    name="price"
                    placeholder="Price"
                    type="number"
                    value={currExpense.price}
                    onChange={handleInputChange}
                    required
                />
                <select
                    className="select-option"
                    name="category"
                    value={currExpense.category}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Category</option>{" "}
                    {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                    ))}
                </select>
                <input
                    name="date"
                    placeholder="Date"
                    type="date"
                    value={currExpense.date}
                    onChange={handleInputChange}
                    required
                />
                <div>
                    <button className="glassmorphismButton" type="submit">
                    Save
                    </button>
                    <button
                    className="glassmorphismButton"
                    type="button"
                    onClick={() => setIsOpen(false)}
                    >
                    Cancel
                    </button>
                </div>
                </form>
            </Modal>
        </>
    )
};

export default ExpenseList;