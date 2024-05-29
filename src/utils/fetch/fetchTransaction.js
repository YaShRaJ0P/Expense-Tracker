import { database } from "../firebaseConfig";
import { ref, get } from "firebase/database";
import { addTransaction, emptyTransaction } from "../state/transaction";
export const fetchTransactionData = async (dispatch, uid) => {
  dispatch(emptyTransaction({}));
  const transactionSnapshot = await get(
    ref(database, `users/${uid}/transactions`)
  );
  if (transactionSnapshot.exists()) {
    const transactions = transactionSnapshot.val();
    Object.entries(transactions).forEach(([key, transaction]) => {
      dispatch(
        addTransaction({
          date: transaction.date,
          amount: transaction.amount,
          description: transaction.description,
          category: transaction.category,
          expenditure: transaction.expenditure,
          id: key,
        })
      );
    });
  } else {
    console.log("No Transaction found for user:", uid);
  }
};
