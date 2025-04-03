import mongoose from "mongoose";
import * as xlsx from "node-xlsx";

import dbConnect from "@/server/dbConnect";

export async function exportData(collections: string[]): Promise<Buffer> {
  await dbConnect();
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("Database connection is not established.");
  }

  const sheets = await Promise.all(
    collections.map(async (collectionName) => {
      const documents = await db.collection(collectionName).find({}).toArray();

      if (documents.length === 0) {
        return {
          name: collectionName,
          data: [["No data"]],
          options: {}, // Ensure options is always defined
        };
      }

      const headers = Object.keys(documents[0]);
      const rows = documents.map((doc) =>
        headers.map((key) => {
          const value = doc[key];
          return typeof value === "object" ? JSON.stringify(value) : value;
        }),
      );

      return {
        name: collectionName,
        data: [headers, ...rows],
        options: {}, // Add an empty options object to satisfy the WorkSheet type
      };
    }),
  );

  return xlsx.build(sheets);
}
