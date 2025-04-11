import mongoose from "mongoose";
import * as xlsx from "node-xlsx";

import dbConnect from "@/server/dbConnect";

export async function exportData(collections: string[]): Promise<Buffer> {
  await dbConnect();
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("Database connection is not established.");
  }

  const collectionAllowList = [
    "enrollmentforms",
    "fagerstromtests",
    "featureflags",
    "healthyhabitstrackingforms",
    "programenrollments",
    "scheduledmeetings",
    "screeningrequests",
    "urgentmeetingrequests",
    "users",
    "vaccinevoucherrequests",
  ];

  // Prevent exporting sensitive collections
  const allowedCollections = collections.filter((c) =>
    collectionAllowList.includes(c),
  );

  const sheets = await Promise.all(
    allowedCollections.map(async (c) => {
      const documents = await db.collection(c).find({}).toArray();

      if (documents.length === 0) {
        return {
          name: c,
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
        name: c,
        data: [headers, ...rows],
        options: {}, // Add an empty options object to satisfy the WorkSheet type
      };
    }),
  );

  return xlsx.build(sheets);
}
