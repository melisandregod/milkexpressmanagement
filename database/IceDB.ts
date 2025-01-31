import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("iceFactoryDB.db");

export interface IceFactory {
  id: number;
  name: string;
  phoneNumber: string;
  quantity: string;
  googlemap: string;
}


export const initIceDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ice_factory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phoneNumber TEXT,
      quantity TEXT,
      googlemap TEXT
    );
  `);
};


export const getIceFactory = async (): Promise<IceFactory | null> => {
  try {
    await initIceDB(); 
    await insertDummyIceFactory(); 
    const result = await db.getAllAsync("SELECT * FROM ice_factory LIMIT 1");
    return result.length > 0 ? (result[0] as IceFactory) : null;
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    return null;
  }
};


export const updateIceFactory = async (id: number, name: string, phoneNumber: string, quantity: string, googlemap: string): Promise<boolean> => {
  try {
    await db.runAsync("UPDATE ice_factory SET name = ?, phoneNumber = ?, quantity = ?, googlemap = ? WHERE id = ?", [
      name,
      phoneNumber,
      quantity,
      googlemap,
      id,
    ]);
    return true;
  } catch (error) {
    console.error("❌ Update Error:", error);
    return false;
  }
};


export const insertDummyIceFactory = async () => {
  const existingData = await db.getAllAsync("SELECT id FROM ice_factory");
  if (existingData.length > 0) return;

  await db.execAsync(`
    INSERT INTO ice_factory (name, phoneNumber, quantity, googlemap) VALUES
    ('โรงน้ำแข็ง ขยะจิรารักษ์พย์', '12345678', '600 - 750 กิโล', 'https://maps.google.com/');
  `);
};
