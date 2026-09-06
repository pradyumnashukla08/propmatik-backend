import { Router } from "express";
import { createPlotNland, deletePlotNland, editPlotNland, getAllPlotNland, getPlotNlandById, updatePlotNlandStatus } from './plotNland.controller';
import authMiddleware from "../../middleware/auth.middleware";

const PlotNLandRouter = Router();

PlotNLandRouter.use(authMiddleware);

PlotNLandRouter.post('/', createPlotNland);
PlotNLandRouter.get('/', getAllPlotNland);
PlotNLandRouter.get('/:id', getPlotNlandById);
PlotNLandRouter.put('/status/:id', updatePlotNlandStatus);
PlotNLandRouter.put('/:id', editPlotNland);
PlotNLandRouter.delete('/:id', deletePlotNland);

export default PlotNLandRouter;