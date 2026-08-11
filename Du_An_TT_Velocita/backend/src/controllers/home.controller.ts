import { Request, Response } from "express"

export const homeController = {
    index: async (req: Request, res: Response) => {
        return res.render('home')
    }
}