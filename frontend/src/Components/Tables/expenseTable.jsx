import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";

const ExpenseTable = ({ handleDelete, handleEdit }) => {
  const [expenseData, setExpenseData] = useState([]);
  const toast = useToast();

  const getUserExpense = async () => {
    try {
      const token = Cookies.get("token"); // retrieve token from cookie
      const response = await axios.get(
        `http://localhost:3700/api/v1/get-expense`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // include token in authorization header
          },
        }
      );
      console.log(response.data);
      setExpenseData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserExpense();
  }, []);

  handleDelete = async (id) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`http://localhost:3700/api/v1/delete-expense/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenseData(expenseData.filter((item) => item.id !== id));
      toast({
        title: "Expense deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error deleting expense",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await handleDelete(id);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error deleting income",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Amount</Th>
          <Th>Date</Th>
          <Th>Category</Th>
          {/* <Th>Description</Th> */}
          <Th>Edit</Th>
          <Th>Delete</Th>
        </Tr>
      </Thead>
      <Tbody>
        {expenseData.map((expense) => (
          <Tr key={expense.id}>
            <Td>{expense.amount}</Td>
            <Td>{expense.date}</Td>
            <Td>{expense.category}</Td>
            {/* <Td>{expense.description}</Td> */}
            <Td>
              <IconButton
                icon={<FaEdit />}
                aria-label="Edit"
                variant="outline"
                onClick={() => handleEdit(expense)}
              />
            </Td>
            <Td>
              <IconButton
                icon={<FaTrash />}
                aria-label="Delete"
                variant="outline"
                onClick={() => handleDeleteClick(expense.id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ExpenseTable;
