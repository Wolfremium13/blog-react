import { getAllFiles } from "../../lib/mdx";

export default async function handler(req, res) {
  const posts = await getAllFiles();
  res.status(200).json(posts);
}