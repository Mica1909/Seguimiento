function submitPackage() {
    // Get form input values
    const trackingNumber = document.getElementById('trackingNumber').value;
    const content = document.getElementById('content').value;
    const weight = document.getElementById('weight').value;
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
  
    // Validate input data
    if (!trackingNumber || !content || !weight || !origin || !destination) {
      console.error('Please fill in all fields.');
      return;
    }
  
    // Additional validation (you can customize based on your requirements)
    if (isNaN(weight) || weight <= 0) {
      console.error('Invalid weight. Please enter a valid positive number.');
      return;
    }
  
    // Package data to be sent to the server
    const packageData = {
      trackingNumber: trackingNumber,
      content: content,
      weight: weight,
      origin: origin,
      destination: destination,
    };
  
    // Send data to the server
    fetch('http://localhost:3000/packages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(packageData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Package sent successfully:', data);
  
        // Display package details after submission
        document.getElementById('trackingNumberDisplay').textContent += data.trackingNumber;
        document.getElementById('contentDisplay').textContent += data.content;
        document.getElementById('weightDisplay').textContent += data.weight;
        document.getElementById('originDisplay').textContent += data.origin;
        document.getElementById('destinationDisplay').textContent += data.destination;
  
        // Display the package details div
        document.getElementById('packageDetails').style.display = 'block';
      })
      .catch(error => {
        console.error('Error sending the package:', error);
      });
  }
  
  
  