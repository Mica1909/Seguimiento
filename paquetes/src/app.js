// app.js
function submitPackage() {
    const trackingNumber = document.getElementById('trackingNumber').value;
    const content = document.getElementById('content').value;
    const weight = document.getElementById('weight').value;
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
  
    const packageData = {
      trackingNumber: trackingNumber,
      content: content,
      weight: weight,
      origin: origin,
      destination: destination,
    };
  
    fetch('http://localhost:3000/packages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(packageData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Paquete enviado exitosamente:', data);
  
        // Mostrar los detalles del paquete después de enviarlo
        document.getElementById('trackingNumberDisplay').textContent += data.trackingNumber;
        document.getElementById('contentDisplay').textContent += data.content;
        document.getElementById('weightDisplay').textContent += data.weight;
        document.getElementById('originDisplay').textContent += data.origin;
        document.getElementById('destinationDisplay').textContent += data.destination;
  
        // Mostrar el div de detalles del paquete
        document.getElementById('packageDetails').style.display = 'block';
      })
      .catch(error => {
        console.error('Error al enviar el paquete:', error);
      });
  }
  
  
  