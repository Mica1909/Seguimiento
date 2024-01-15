from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Base de datos simulada para el rastreo de envíos
envios_db = {
    '123456': 'En tránsito',
    '789012': 'Entregado',
    '345678': 'En proceso de entrega',
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/rastreo', methods=['POST'])
def rastreo():
    codigo_seguimiento = request.form['codigo_seguimiento']
    estado = envios_db.get(codigo_seguimiento, 'No encontrado')
    return render_template('rastreo.html', codigo=codigo_seguimiento, estado=estado)

@app.route('/devolver', methods=['POST'])
def devolver():
    codigo_seguimiento = request.form['codigo_seguimiento']
    
    # Lógica de devolución (puedes actualizar la base de datos o realizar otras acciones)
    envios_db[codigo_seguimiento] = 'Devuelto'
    
    # Redirigir de nuevo a la página de rastreo con la actualización
    return redirect(url_for('rastreo', codigo_seguimiento=codigo_seguimiento))

if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000, debug=True)
