import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("milkFactoryDB.db");
export interface MilkFactory {
    id: number;
    name: string;
    phoneNumber: string;
    quantity: string;
    googlemap: string;
  }

export const initMilkDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS milk_factory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phoneNumber TEXT,
      quantity TEXT,
      googlemap TEXT
    );
  `);
};


export const getMilkFactory = async (): Promise<MilkFactory | null> => {
    try {
      const result = await db.getAllAsync("SELECT * FROM milk_factory LIMIT 1");
      return result.length > 0 ? (result[0] as MilkFactory) : null; 
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      return null;
    }
  };


export const updateMilkFactory = async (id: number, name: string, phoneNumber: string, quantity: string, googlemap: string) => {
  try {
    await db.runAsync("UPDATE milk_factory SET name = ?, phoneNumber = ?, quantity = ?, googlemap = ? WHERE id = ?", [
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


export const insertDummyMilkFactory = async () => {
  const existingData = await db.getAllAsync("SELECT id FROM milk_factory");
  if (existingData.length > 0) return;

  await db.execAsync(`
    INSERT INTO milk_factory (name, phoneNumber, quantity, googlemap) VALUES
    ('สหกรณ์ โคนมขะจำ - นัยทรายจิรกัด', '0843432425542', '4000', 'https://maps.google.com/');
  `);
};
