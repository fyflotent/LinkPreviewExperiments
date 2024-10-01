import express from "express";
import ogs from "open-graph-scraper";

const router = express.Router();

type UrlPreviewResponse =
  | {
      title: string | undefined;
      description: string | undefined;
      image: string | undefined;
    }
  | { error: string };

router.post<{ url: string }, UrlPreviewResponse>("/", (req, res) => {
  const url = req.body.url;
  console.debug("Fetching URL preview for", url);
  ogs({ url: url })
    .then((data) => {
      const urlHost = new URL(url);

      const imgUrl = data.result.ogImage?.[0]?.url;

      res.json({
        title: data.result.ogTitle,
        description: data.result.ogDescription,
        image: imgUrl?.startsWith("/") ? `${urlHost.origin}${imgUrl}` : imgUrl,
      });
    })
    .catch((e) => {
      console.error("Error fetching URL preview", e);
      res.status(400).json({ error: "Error fetching URL preview" });
    });
});

export default router;
