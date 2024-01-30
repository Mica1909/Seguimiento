document.addEventListener('DOMContentLoaded', function () {

    // Function to load packages from the backend
    function loadPackages() {
      fetch('/packages')
        .then(response => response.json())
        .then(data => {
          const packagesContainer = document.getElementById('packages');
          packagesContainer.innerHTML = '<h2>Packages</h2>';
          
          data.forEach(package => {
            const packageItem = document.createElement('div');
            packageItem.className = 'list-item';
            packageItem.innerHTML = `
              <p><strong>Tracking Number:</strong> ${package.trackingNumber}</p>
              <p><strong>Content:</strong> ${package.content}</p>
              <p><strong>Weight:</strong> ${package.weight} kg</p>
              <p><strong>Origin:</strong> ${package.origin}</p>
              <p><strong>Destination:</strong> ${package.destination}</p>
            `;
            packagesContainer.appendChild(packageItem);
          });
        })
        .catch(error => console.error('Error loading packages:', error));
    }
  
    // Function to load drivers from the backend
    function loadDrivers() {
      fetch('/drivers')
        .then(response => response.json())
        .then(data => {
          const driversContainer = document.getElementById('drivers');
          driversContainer.innerHTML = '<h2>Drivers</h2>';
          
          data.forEach(driver => {
            const driverItem = document.createElement('div');
            driverItem.className = 'list-item';
            driverItem.innerHTML = `
              <p><strong>Name:</strong> ${driver.name}</p>
              <p><strong>License Number:</strong> ${driver.licenseNumber}</p>
              <p><strong>Vehicle:</strong> ${driver.vehicle}</p>
              <p><strong>Available:</strong> ${driver.available ? 'Yes' : 'No'}</p>
            `;
            driversContainer.appendChild(driverItem);
          });
        })
        .catch(error => console.error('Error loading drivers:', error));
    }
  
    // Function to load assignments from the backend
    function loadAssignments() {
      fetch('/assignments')
        .then(response => response.json())
        .then(data => {
          const assignmentsContainer = document.getElementById('assignments');
          assignmentsContainer.innerHTML = '<h2>Assignments</h2>';
          
          data.forEach(assignment => {
            const assignmentItem = document.createElement('div');
            assignmentItem.className = 'list-item';
            assignmentItem.innerHTML = `
              <p><strong>Package ID:</strong> ${assignment.packageId}</p>
              <p><strong>Driver ID:</strong> ${assignment.driverId}</p>
              <p><strong>Assigned at:</strong> ${new Date(assignment.assignedAt).toLocaleString()}</p>
            `;
            assignmentsContainer.appendChild(assignmentItem);
          });
        })
        .catch(error => console.error('Error loading assignments:', error));
    }
  
    // Load data when the page is loaded
    loadPackages();
    loadDrivers();
    loadAssignments();
  });
  