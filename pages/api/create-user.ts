import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@utils/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { createUser } = auth;

    const { email, password } = req.body;

    return createUser({
      email: email,
      password: password,
    })
      .then((data) => {
        res.status(200).json(data);
        res.end();
      })
      .catch((error) => {
        res.status(400).json({ error });
        res.end();
      });
  }
}
