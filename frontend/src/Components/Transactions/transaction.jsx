import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Divider,
  useToast,
  Button,
} from "@chakra-ui/react";
import "./transaction.css";
import IncomeForm from "../Forms/incomeForm";
import ExpenseForm from "../Forms/expenseForm";
import ExpenseTable from "../Tables/expenseTable";
import IncomeTable from "../Tables/incomeTable";

const TrackerPage = ({handleDelete}) => {
  const toast = useToast();
  const [selectedTable, setSelectedTable] = useState("income");
  const [currentPage, setCurrentPage] = useState(1);


  const handleSelectIncome = () => {
    setSelectedTable("income");
    setCurrentPage(1)
  };

  const handleSelectExpense = () => {
    setSelectedTable("expense");
  };

  return (
    <Flex justifyContent="center" alignItems="center" p={4}>
      <Box w="25%" mr={2}>
        <Heading mb={4} textAlign={"center"}>
          Add Income
        </Heading>
        <IncomeForm toast={toast} />
        <Divider my={4} />
      </Box>
      <Box w="25%" ml={2} mr={0}>
        <Heading mb={4} textAlign={"center"}>
          Add Expense
        </Heading>
        <ExpenseForm toast={toast} />
        <Divider my={4} />
      </Box>
      <Box w="50%"className="table-container" ml={'15px'} height="500px"  >
        <Button
          variant={selectedTable === "income" ? "solid" : "outline"}
          colorScheme="green"
          onClick={handleSelectIncome}
          disabled={selectedTable === "income"}
          mr={2}
          mb={'4px'}
        >
          Show Income Table
        </Button>
        <Button
          variant={selectedTable === "expense" ? "solid" : "outline"}
          colorScheme="green"
          onClick={handleSelectExpense}
          disabled={selectedTable === "expense"}
          mb={'4px'}
        >
          Show Expense Table
        </Button>
        {selectedTable === "income" ? (
          <IncomeTable toast={toast} currentPage={currentPage} setCurrentPage= {setCurrentPage} itemsPerPage={5} />
        ) : (
          <ExpenseTable toast={toast} currentPage={currentPage}/>
        )}
        <Flex justifyContent="center" mt={4}>
          <Button
            disabled={currentPage === 1}
            mr={4}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous Page
          </Button>
          <Button
            disabled={
              (selectedTable === "income"
                ? currentPage === Math.ceil(IncomeTable.length / 5)
                : currentPage === Math.ceil(ExpenseTable.length / 5)) ||
              (selectedTable === "income" && IncomeTable.length === 0) ||
              (selectedTable === "expense" && ExpenseTable.length === 0)
            }
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next Page
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default TrackerPage;
