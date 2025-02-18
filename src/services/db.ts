
interface QuizAttempt {
  id?: number;
  timestamp: number;
  score: number;
  totalQuestions: number;
  timePerQuestion: number[];
}

class QuizDatabase {
  private dbName = "QuizDB";
  private version = 1;
  private db: IDBDatabase | null = null;

  async init() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("attempts")) {
          db.createObjectStore("attempts", { keyPath: "id", autoIncrement: true });
        }
      };
    });
  }

  async saveAttempt(attempt: QuizAttempt) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["attempts"], "readwrite");
      const store = transaction.objectStore("attempts");
      const request = store.add(attempt);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAttempts(): Promise<QuizAttempt[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["attempts"], "readonly");
      const store = transaction.objectStore("attempts");
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

export const quizDB = new QuizDatabase();
