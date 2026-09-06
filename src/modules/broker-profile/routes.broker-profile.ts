import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { createBrokerProfile, getAllBrokerProfile, getBrokerProfile, updateBrokerProfile } from "./controller.broker-profile";

const BrokerProfileRouter = Router();

BrokerProfileRouter.use(authMiddleware);

BrokerProfileRouter.post('/', createBrokerProfile);
BrokerProfileRouter.get('/', getBrokerProfile);
BrokerProfileRouter.get('/all-broker', getAllBrokerProfile);
BrokerProfileRouter.put('/', updateBrokerProfile);

export default BrokerProfileRouter;