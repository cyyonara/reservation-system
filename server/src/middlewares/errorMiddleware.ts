import { Request, Response, NextFunction } from "express";

export const notfound = (req: Request, res: Response) => {
   res.status(404).json({ message: "Resource not found" });
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
   res.status(statusCode).json({ message: err.message || "Internal server error" });
};
