import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    // Fetch customers from your API
    axios.get('http://localhost:4000/customers')
      .then((response) => {
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []); // Empty dependency array to ensure useEffect runs once on mount

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = customers.filter((customer) =>
      customer.first_name.toLowerCase().includes(searchValue) ||
      customer.last_name.toLowerCase().includes(searchValue) ||
      customer.customer_id.toString().includes(searchValue)
    );

    setFilteredCustomers(filtered);
  };

  const generatePDFReport = async () => {
    try {
      // Send a GET request to the backend to generate the PDF report
      const response = await axios.get('http://localhost:4000/generate-pdf-report', {
        responseType: 'blob',
      });

      // Create a blob URL for the PDF data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'customer_report.pdf';
      a.click();

      // Release the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF report:', error);
    }
  };

  return (
    <div>
      <h1>Movie Store</h1>
      <div className="buttons">
        <button><Link to="/">Home</Link></button>
        <button><Link to="/movies">Movies</Link></button>
        <button><Link to="/customers">Customers</Link></button>
        <button onClick={generatePDFReport}>Generate PDF Report</button>
      </div>
      <h1>Customer List</h1>
      <button><Link to="/add-customer">Add Customer</Link></button>
      <input
        type="text"
        placeholder="Search by ID, First or Last Name"
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.customer_id}>
              <td>
                <Link to={`/customer/${customer.customer_id}`}>
                  {customer.customer_id}
                </Link>
              </td>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
