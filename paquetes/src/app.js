// app.js
document.addEventListener('DOMContentLoaded', () => {
    function submitPackage() {
      const packageName = document.getElementById('packageName').value;
      const packageWeight = document.getElementById('packageWeight').value;
  
      const data = {
        name: packageName,
        weight: packageWeight,
      };
  
      // Realiza una solicitud POST al servidor
      fetch('http://localhost:3000/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(result => {
        console.log('Resultado del servidor:', result);
        // Puedes realizar acciones adicionales después de recibir la respuesta del servidor
      })
      .catch(error => console.error('Error:', error));
    }
  });
  