import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("schoolDB.db"); 


export const initDB = () => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS schools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phoneNumber TEXT,
      quantity INTEGER,
      googlemap TEXT,
      status INTEGER DEFAULT 0
    );
  `)
    .then(() => console.log("✅ Table created"))
    .catch((error) => console.error("❌ Table Error:", error));
};


export const getAllSchools = async (): Promise<any[]> => {
  try {
    return await db.getAllAsync("SELECT * FROM schools");
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    return [];
  }
};


export const insertDummyData = async () => {
    try {
      
      const existingData = await db.getAllAsync("SELECT id FROM schools");
      if (existingData.length > 0) {
        console.log("✅ ข้อมูลมีอยู่แล้ว ไม่ต้องเพิ่มใหม่");
        return;
      }
  
      await db.execAsync(`
        INSERT INTO schools (id, name, phoneNumber, quantity, googlemap, status) VALUES 
        (1, 'School 1', '123456789', 1, 'test', 1),
        (2, 'School 2', '123456789', 2, 'test', 0),
        (3, 'School 3', '123456789', 3, 'test', 1),
        (4, 'School 4', '123456789', 4, 'test', 0),
        (5, 'School 5', '123456789', 5, 'test', 1),
        (6, 'School 5', '123456789', 5, 'test', 0),
        (7, 'School 5', '123456789', 5, 'test', 1),
        (9, 'School 5', '123456789', 5, 'test', 0);
      `);
      console.log("✅ เพิ่มข้อมูลสำเร็จ!");
    } catch (error) {
      console.error("❌ Insert Error:", error);
    }
  };
  
  export const addSchool = async (name: string, phoneNumber: string, quantity: number, googlemap: string) => {
    try {
      await db.runAsync(
        "INSERT INTO schools (name, phoneNumber, quantity, googlemap, status) VALUES (?, ?, ?, ?, ?)",
        [name, phoneNumber, quantity, googlemap, 0]
      );
      console.log("✅ เพิ่มโรงเรียนสำเร็จ");
    } catch (error) {
      console.error("❌ Insert Error:", error);
    }
  };

  export const updateSchool = async (id: number, name: string, phoneNumber: string, quantity: number, googlemap: string, status: boolean) => {
    try {
      await db.runAsync(
        "UPDATE schools SET name = ?, phoneNumber = ?, quantity = ?, googlemap = ?, status = ? WHERE id = ?",
        [name, phoneNumber, quantity, googlemap, status ? 1 : 0, id]
      );
      console.log("✅ อัปเดตสำเร็จ");
    } catch (error) {
      console.error("❌ Update Error:", error);
    }
  };

  export const deleteSchool = async (id: number) => {
    try {
      await db.runAsync("DELETE FROM schools WHERE id = ?", [id]);
      console.log("✅ ลบข้อมูลสำเร็จ");
    } catch (error) {
      console.error("❌ Delete Error:", error);
    }
  };

  export const updateSchoolStatus = async (id: number, newStatus: boolean): Promise<boolean> => {
    try {
      await db.runAsync("UPDATE schools SET status = ? WHERE id = ?", [newStatus ? 1 : 0, id]);
      console.log(`✅ อัปเดตสถานะโรงเรียน ID: ${id} เป็น ${newStatus ? "✔️ Checked" : "❌ Unchecked"}`);
      return true; 
    } catch (error) {
      console.error("❌ Update Status Error:", error);
      return false; 
    }
  };
  

  export const getSchoolById = async (id: number): Promise<any | null> => {
    try {
      const result = await db.getAllAsync("SELECT * FROM schools WHERE id = ?", [id]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      return null;
    }
  };