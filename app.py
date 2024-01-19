from flask import Flask, render_template, request, redirect, url_for, g
import psycopg2
from psycopg2 import sql

app = Flask(__name__)

DB_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'user': 'mike',
    'password': 'mike1234',
    'database': 'seguimiento'
}

def get_db_connection():
    if 'db' not in g:
        g.db = psycopg2.connect(**DB_CONFIG)
    return g.db

@app.teardown_appcontext
def close_db(error):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def execute_query(query, params=None, fetchone=False):
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, params)
            if fetchone:
                return cursor.fetchone()
            else:
                return cursor.fetchall()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/rastreo', methods=['POST'])
def rastreo():
    codigo_seguimiento = request.form['codigo_seguimiento']
    query = sql.SQL('SELECT estado FROM envios WHERE codigo_seguimiento = {}').format(sql.Literal(codigo_seguimiento))
    resultado = execute_query(query, fetchone=True)
    estado = resultado[0] if resultado else 'No encontrado'
    return render_template('rastreo.html', codigo=codigo_seguimiento, estado=estado)

@app.route('/devolver', methods=['POST'])
def devolver():
    codigo_seguimiento = request.form['codigo_seguimiento']
    query = 'UPDATE envios SET estado = %s WHERE codigo_seguimiento = %s'
    execute_query(query, ('Devuelto', codigo_seguimiento), fetchone=False)
    return redirect(url_for('rastreo', codigo_seguimiento=codigo_seguimiento))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
