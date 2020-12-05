import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';

const querySchema = yup.object({
  title: yup.string().max(40).notRequired(),
  subtitle: yup.string().max(60).notRequired(),
  theme: yup
    .string()
    .matches(/(dark|light)/)
    .notRequired(),
  fileType: yup
    .string()
    .matches(/(jpeg|png)/)
    .notRequired(),
  fontSize: yup
    .string()
    .matches(/([0-9])\w+/)
    .notRequired(),
});

export const validateQuery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await querySchema.validate(req.query);
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
