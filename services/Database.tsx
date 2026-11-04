import * as SQLite from 'expo-sqlite';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function openDatabase(): Promise<SQLite.SQLiteDatabase> {
  
  if (!dbPromise) {

    dbPromise = (async () => {
      
      const db = await SQLite.openDatabaseAsync('BasePatagon.db');
      
      // DROP TABLE IF EXISTS users;
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          dni INTEGER,
          email TEXT,
          pasword TEXT,
          foto TEXT
        );
        
        CREATE TABLE IF NOT EXISTS peliculas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT,
          imagen ITEGER
        );

        CREATE TABLE IF NOT EXISTS entradas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_user INTEGR,
          titulo TEXT,
          imagen INTEGER,
          horario TEXT,
          dia TEXT,
          formato TEXT,
          idioma TEXT,
          asientos TEXT
        );
      `);

      const { total } = (await db.getFirstAsync<{ total: number }>(
        'SELECT COUNT(*) AS total FROM peliculas'
      ))!;

      if (total === 0) {
        await db.execAsync(`
          INSERT INTO peliculas (titulo, imagen) VALUES
            ('Jumanji', '../img/Jumanji.jpg'),
            ('Star Wars', '../img/Star Wars.jpg'),
            ('Black Adam', '../img/Black Adam.png'),
            ('Uncharted', '../img/Uncharted.png'),
            ('Rapidos y Furiosos', '../img/Rapidos y Furiosos.jpg');
        `);
      }
      
      return db;
    })();
  }
  return dbPromise;
}



/*            ('Jumanji', ${require('../img/Jumanji.jpg')}),
            ('Star Wars', ${require('../img/Star Wars.jpg')}),
            ('Black Adam', ${require('../img/Black Adam.png')}),
            ('Uncharted', ${require('../img/Uncharted.png')}),
            ('Rapidos y Furiosos', ${require('../img/Rapidos y Furiosos.jpg')});*/
