import {Router} from "express";

export const adRouter = Router();

adRouter
  .get('/ad', async (req, res) => {
    res.json({
        ok: true,
      }
    )
  })