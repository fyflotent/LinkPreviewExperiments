import express from "express";

const router = express.Router();

type UrlPreviewResponse = {
  title: string;
  description: string;
  image: string;
};

router.post<{ url: string }, UrlPreviewResponse>("/", (req, res) => {
  const url = req.body.url;
  console.log(url);
  res.json({
    title: "Title",
    description: "Description",
    image: "https://via.placeholder.com/150",
  });
});

export default router;
