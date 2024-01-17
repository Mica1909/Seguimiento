import psycopg2
import random
import string

# Configuración de la base de datos
DB_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'user': 'mike',
    'password': 'mike1234',
    'database': 'seguimiento'
}

def create_table():
    # Crear la tabla envios si no existe
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS envios (
                    codigo_seguimiento VARCHAR(20) PRIMARY KEY,
                    estado VARCHAR(50)
                )
            ''')
            conn.commit()

def insert_dummy_data():
    # Insertar registros dummy en la base de datos
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            for _ in range(1000):
                codigo_dummy = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
                estado_dummy = random.choice(['En tránsito', 'Entregado', 'En proceso de entrega'])

                cursor.execute('''
                    INSERT INTO envios (codigo_seguimiento, estado) VALUES (%s, %s)
                ''', (codigo_dummy, estado_dummy))
                conn.commit()

def get_db_connection():
    # Obtener una conexión a la base de datos desde el pool de conexiones
    return psycopg2.connect(**DB_CONFIG)

if __name__ == '__main__':
    create_table()
    insert_dummy_data()
    print("Base de datos, tabla y registros dummy creados exitosamente.")
