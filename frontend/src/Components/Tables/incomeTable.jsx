import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"
import axios from "axios"
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

const IncomeTable = ({ handleDelete, handleEdit, currentPage, itemsPerPage = 5 }) => {
const [incomeData, setIncomeData] = useState([]);
  const toast = useToast();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentIncomes = incomeData.slice(startIndex, endIndex);
  console.log(currentIncomes)

  const getUserIncome = async () => {
  try {
    const token = Cookies.get('token'); // retrieve token from cookie
    const response = await axios.get(`http://localhost:3700/api/v1/get-income`, {
      headers: {
        Authorization: `Bearer ${token}`, // include token in authorization header
      },
    });
    console.log(response.data)
    setIncomeData(response.data);
    
  } catch (error) {
    console.error(error);
  }
};

 useEffect(() => {
    getUserIncome();
  }, []);


  const handleDeleteClick = (id) => {
    handleDelete(id);
    toast({
      title: "Income deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Table variant="simple" w={'50%'}>
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
        {currentIncomes.map((income) => (
          <Tr key={income.id}>
            <Td>{income.amount}</Td>
            <Td>{income.date}</Td>
            <Td>{income.category}</Td>
            {/* <Td>{income.description}</Td> */}
            <Td>
              <IconButton
                icon={<FaEdit />}
                aria-label="Edit"
                variant="outline"
                onClick={() => handleEdit(income)}
              />
            </Td>
            <Td>
              <IconButton
                icon={<FaTrash />}
                aria-label="Delete"
                variant="outline"
                onClick={() => handleDeleteClick(income.id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default IncomeTable;
