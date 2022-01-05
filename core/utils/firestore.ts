import { addDoc, collection } from "firebase/firestore";
import { auth, firestore } from "./firebase";

// TODO : transform this as a context, and handle errors, laoding states, etc.
// need this, even for succesful trades, as I want to show a banner, whenever they do a successful trade or the trade doesn't work.

export const addTrade = async (data: GetCoinProp): Promise<void> => {
  const user = auth.currentUser;

  // TODO: Change how we generate _id's
  if (user) {
    await addDoc(collection(firestore, "trades", user.uid, "user_trades"), {
      _id: new Date().getTime().toString(),
      amount: 0,
      leverage: 1,
      buy_price: data.current_price,
      ...data,
      close_price: null,
      return_amount: null,
      return_procentage: null,
    }).catch((error) => console.error(error));
  }
};
