  // edit button
  const handleEditCustomer = async () => {
    try {
      // Send a PUT request to update the customer's information on the backend
      await axios.put(`http://localhost:4000/customers/${customerId}/edit`, {
        first_name: 'NewFirstName', // Replace with the new first name
        last_name: 'NewLastName',   // Replace with the new last name
        email: 'newemail@example.com', // Replace with the new email
        // Add other fields that you want to update
      });
  
      // Optionally, you can fetch and update the customer data after editing
      const editCustResponse = await axios.get(`http://localhost:4000/customers/${customerId}`);
      setCustomer(editCustResponse.data);
  
      // You can add additional logic here to handle the updated customer data.
    } catch (err) {
      console.log(err);
    }
  };
  