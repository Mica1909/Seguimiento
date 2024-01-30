document.addEventListener('DOMContentLoaded', function () {
    // Función para cargar paquetes desde el backend
    function loadPackages() {
      fetch('/packages')
        .then(response => response.json())
        .then(data => {
          const packagesContainer = document.getElementById('packages');
          packagesContainer.innerHTML = '<h2>Paquetes</h2>';
          
          data.forEach(package => {
            const packageItem = document.createElement('div');
            packageItem.className = 'list-item';
            packageItem.innerHTML = `
              <p><strong>Número de seguimiento:</strong> ${package.trackingNumber}</p>
              <p><strong>Contenido:</strong> ${package.content}</p>
              <p><strong>Peso:</strong> ${package.weight} kg</p>
              <p><strong>Origen:</strong> ${package.origin}</p>
              <p><strong>Destino:</strong> ${package.destination}</p>
            `;
            packagesContainer.appendChild(packageItem);
          });
        })
        .catch(error => console.error('Error al cargar paquetes:', error));
    }
  
    // Función para cargar choferes desde el backend
    function loadDrivers() {
      fetch('/drivers')
        .then(response => response.json())
        .then(data => {
          const driversContainer = document.getElementById('drivers');
          driversContainer.innerHTML = '<h2>Choferes</h2>';
          
          data.forEach(driver => {
            const driverItem = document.createElement('div');
            driverItem.className = 'list-item';
            driverItem.innerHTML = `
              <p><strong>Nombre:</strong> ${driver.name}</p>
              <p><strong>Número de licencia:</strong> ${driver.licenseNumber}</p>
              <p><strong>Vehículo:</strong> ${driver.vehicle}</p>
              <p><strong>Disponible:</strong> ${driver.available ? 'Sí' : 'No'}</p>
            `;
            driversContainer.appendChild(driverItem);
          });
        })
        .catch(error => console.error('Error al cargar choferes:', error));
    }
  
    // Función para cargar asignaciones desde el backend
    function loadAssignments() {
      fetch('/assignments')
        .then(response => response.json())
        .then(data => {
          const assignmentsContainer = document.getElementById('assignments');
          assignmentsContainer.innerHTML = '<h2>Asignaciones</h2>';
          
          data.forEach(assignment => {
            const assignmentItem = document.createElement('div');
            assignmentItem.className = 'list-item';
            assignmentItem.innerHTML = `
              <p><strong>ID del Paquete:</strong> ${assignment.packageId}</p>
              <p><strong>ID del Chofer:</strong> ${assignment.driverId}</p>
              <p><strong>Asignado en:</strong> ${new Date(assignment.assignedAt).toLocaleString()}</p>
            `;
            assignmentsContainer.appendChild(assignmentItem);
          });
        })
        .catch(error => console.error('Error al cargar asignaciones:', error));
    }
  
    // Cargar datos al cargar la página
    loadPackages();
    loadDrivers();
    loadAssignments();
  });
  