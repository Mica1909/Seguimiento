from flask import Flask, render_template, request, redirect, url_for
import psycopg2

app = Flask(__name__)

DB_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'user': 'mike',
    'password': 'mike1234',
    'database': 'seguimiento'
}

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/rastreo', methods=['POST'])
def rastreo():
    codigo_seguimiento = request.form['codigo_seguimiento']

    # Utiliza la conexión a la base de datos para recuperar el estado desde PostgreSQL
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute('SELECT estado FROM envios WHERE codigo_seguimiento = %s', (codigo_seguimiento,))
            resultado = cursor.fetchone()
            estado = resultado[0] if resultado else 'No encontrado'

    return render_template('rastreo.html', codigo=codigo_seguimiento, estado=estado)

@app.route('/devolver', methods=['POST'])
def devolver():
    codigo_seguimiento = request.form['codigo_seguimiento']

    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute('UPDATE envios SET estado = %s WHERE codigo_seguimiento = %s', ('Devuelto', codigo_seguimiento))
            conn.commit()

    return redirect(url_for('rastreo', codigo_seguimiento=codigo_seguimiento))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)