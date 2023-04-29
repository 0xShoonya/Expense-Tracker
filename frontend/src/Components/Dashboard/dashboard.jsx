import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Box,
  Flex,
  Text,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Spacer,
  Select,
} from "@chakra-ui/react";
import axios from "axios";

const Dashboards = () => {
  const [data, setData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  const [selectedMonth, setSelectedMonth] = useState(4);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const token = Cookies.get("token");

      const { data } = await axios.get(
        `http://localhost:3700/api/v1/monthly-income-expense?month=${selectedMonth}&year=${selectedYear}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setData(data.data);
      setTotalIncome(data.totalIncome);
      setTotalExpense(data.totalExpense);
      setTotalSavings(data.totalIncome - data.totalExpense);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleExport = () => {
    // Export data to CSV or PDF
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableData = () => {
    if (currentItems.length === 0) {
      return (
        <Tr>
          <Td colSpan="6">No data available for selected month and year</Td>
        </Tr>
      );
    } else {
      return currentItems.map((item) => (
        <Tr key={item.id}>
          <Td>{item.date}</Td>
          <Td>{item.category}</Td>
          <Td isNumeric>{item.income}</Td>
          <Td isNumeric>{item.expense}</Td>
          <Td isNumeric>{item.savings}</Td>
        </Tr>
      ));
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <Button key={number} size="sm" onClick={() => handlePageChange(number)}>
        {number}
      </Button>
    ));
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" mb={4}>
        <Heading size="md">Yearly History</Heading>
        <HStack>
          <Select value={selectedMonth} onChange={handleMonthChange}>
            <option value="">Select Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </Select>
          <Spacer />
          <Select value={selectedYear} onChange={handleYearChange}>
            <option value="">Select Year</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </Select>
          <Spacer />
          <Button colorScheme="blue" onClick={handleExport}>
            Export
          </Button>
        </HStack>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Category</Th>
            <Th isNumeric>Income</Th>
            <Th isNumeric>Expense</Th>
            <Th isNumeric>Savings</Th>
          </Tr>
        </Thead>
        <Tbody>{renderTableData()}</Tbody>
      </Table>
      <Flex justify="center" my={4}>
        <HStack>{renderPageNumbers()}</HStack>
      </Flex>
    </Box>
  );
};

export default Dashboards;
