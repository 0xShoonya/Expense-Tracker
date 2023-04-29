import React, { useState, useEffect } from "react";
import {
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading,
  Flex,
} from "@chakra-ui/react";
import html2pdf from "html2pdf.js";
import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const fetchData = async () => {
    try {
      const token = Cookies.get("token");

      const { data } = await axios.get(
        `http://localhost:3700/api/v1/monthly-income-expense?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIncome(data.totalIncome);
      setExpense(data.totalExpense);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (month && year) {
      fetchData();
    }
  }, [month, year]);

  // Calculate savings based on total income and expense
  const savings = income - expense;

  // Data for the pie chart
  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
    { name: "Savings", value: savings },
  ];

  // Handler for export button click
  const handleExportPDF = () => {
    const element = document.getElementById("dashboard-container");
    const opt = {
      margin: 1,
      filename: "dashboard.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      m="2rem"
      id="dashboard-container"
    >
      <Heading as="h1" mb="1rem">
        Monthly Statement
      </Heading>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        mb="1rem"
      >
        <Select
          placeholder="Select month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          mr={{ base: "0", md: "1rem" }}
          mb={{ base: "1rem", md: "0" }}
          w={{ base: "100%", md: "auto" }}
        >
          <option value="">Select month</option>
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
        <Select
          placeholder="Select year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          w={{ base: "100%", md: "auto" }}
        >
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </Select>
      </Flex>
      {income !== 0 && expense !== 0 && (
        <Box>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Month</Th>
                <Th>Year</Th>
                <Th>Total Income</Th>
                <Th>Total Expense</Th>
                <Th>Savings</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{month}</Td>
                <Td>{year}</Td>
                <Td>{"$" + income}</Td>
                <Td>{"$" + expense}</Td>
                <Td>{"$" + savings}</Td>
              </Tr>
            </Tbody>
          </Table>
          <Flex justifyContent="center" mt="1rem">
            <Button colorScheme="blue" size="sm" onClick={handleExportPDF}>
              Export as pdf
            </Button>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default Dashboard;
