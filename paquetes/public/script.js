// script.js goitia

// Esta función se llama cuando se hace clic en el botón "Submit Package" en el formulario
function submitPackage() {
    // Obtén los valores del formulario
    const trackingNumber = document.getElementById('trackingNumber').value;
    const content = document.getElementById('content').value;
    const weight = document.getElementById('weight').value;
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
  
    // Crea un objeto con los datos del paquete
    const packageData = {
      trackingNumber: trackingNumber,
      content: content,
      weight: weight,
      origin: origin,
      destination: destination,
    };
  
    // Realiza una solicitud POST al servidor
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
  
        // Muestra los detalles del paquete después de enviarlo
        document.getElementById('trackingNumberDisplay').textContent = data.trackingNumber;
        document.getElementById('contentDisplay').textContent = data.content;
        document.getElementById('weightDisplay').textContent = data.weight;
        document.getElementById('originDisplay').textContent = data.origin;
        document.getElementById('destinationDisplay').textContent = data.destination;
  
        // Muestra el div de detalles del paquete
        document.getElementById('packageDetails').style.display = 'block';
      })
      .catch(error => {
        console.error('Error sending the package:', error);
      });
  }
  