"use server";
import Credit from "@/models/credit";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";

export const saveCreditToDb = async (amount: number, credits: number) => {
  try {
    await db();

    const user = await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    if (!userEmail) {
      // No authenticated user — don't attempt to create a Credit document with a missing userEmail.
      console.warn("saveCreditToDb: no authenticated user");
      return null;
    }

    // check if the user already has a credit record
    const existingCredit = await Credit.findOne({ userEmail });

    if (existingCredit) {
      existingCredit.amount += amount;
      existingCredit.credits += credits;
      await existingCredit.save();

      return JSON.parse(JSON.stringify(existingCredit));
    } else {
      const newCredit = new Credit({
        userEmail,
        amount,
        credits,
      });

      await newCredit.save();
      return JSON.parse(JSON.stringify(newCredit));
    }
  } catch (err) {
    console.error(err);
  }
};

export const getUserCreditsDb = async () => {
  try {
    await db();

    const user = await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    if (!userEmail) {
      console.warn("getUserCreditsDb: no authenticated user");
      return null;
    }

    const credit = await Credit.findOne({ userEmail });
    return JSON.parse(JSON.stringify(credit));
  } catch (err) {
    console.error(err);
  }
};

export const checkCreditRecordDb = async () => {
  try {
    await db();

    const user = await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    if (!userEmail) {
      // Caller can handle null (unauthenticated). Avoid creating a Credit with undefined userEmail.
      console.warn("checkCreditRecordDb: no authenticated user");
      return null;
    }

    const credit = await Credit.findOne({ userEmail });

    if (!credit) {
      const newCredit = new Credit({
        userEmail,
        amount: 0,
        credits: 5,
      });

      await newCredit.save();
      return JSON.parse(JSON.stringify(newCredit));
    }

    // If a credit record already exists, return it so callers always get a value.
    return JSON.parse(JSON.stringify(credit));
  } catch (err: unknown) {
    // Preserve the original error message and stack so Next.js can show
    // a helpful message instead of "no message was provided".
    console.error("checkCreditRecordDb error:", err);
    if (err instanceof Error) throw err;
    throw new Error(String(err ?? "checkCreditRecordDb failed"));
  }
};
