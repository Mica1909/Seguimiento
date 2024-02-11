from telegram.ext import Updater, CommandHandler
import psycopg2

# Conexión a la base de datos PostgreSQL
def connect_to_postgres():
    try:
        conn = psycopg2.connect(
            dbname="envios",  # Reemplaza "nombre_base_de_datos" con el nombre de tu base de datos
            user="paquetes",  # Reemplaza "usuario" con el nombre de usuario de tu base de datos
            password="123456",  # Reemplaza "contraseña" con la contraseña de tu base de datos
            host="localhost"
        )
        return conn
    except psycopg2.Error as e:
        print("Error de conexión a PostgreSQL:", e)
        return None

# Manejador del comando /paquetes
# Manejador del comando /paquetes
def paquetes(update, context):
    conn = connect_to_postgres()
    if conn:
        try:
            cur = conn.cursor()
            cur.execute("SELECT * FROM paquetes")
            rows = cur.fetchall()
            if rows:
                mensaje = "Paquetes registrados:\n"
                for row in rows:
                    mensaje += f"ID: {row[0]}, Dirección: {row[1]}, Teléfono: {row[2]}\n"
                update.message.reply_text(mensaje)
            else:
                update.message.reply_text("No hay paquetes registrados.")
        except psycopg2.Error as e:
            print("Error al ejecutar la consulta:", e)
            update.message.reply_text("Hubo un error al ejecutar la consulta.")
        finally:
            conn.close()
    else:
        update.message.reply_text("Hubo un error al conectar con la base de datos.")
# Inicialización del bot de Telegram
updater = Updater(token='6923753121:AAFCi6rhqQdAn2X7YIBi-TZ2y9WUwES0BQQ', use_context=True)
dispatcher = updater.dispatcher

# Registro del manejador de comandos
dispatcher.add_handler(CommandHandler('paquetes', paquetes))

# Iniciar el bot
updater.start_polling()
updater.idle()