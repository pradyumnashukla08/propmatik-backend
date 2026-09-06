import { z } from "zod";

export const createPropertyInteractionSchema = z.object({
  propertyId: z.string().min(1, "Property ID is required"),

  type: z.enum(
    ["Chat", "VideoCall", "SiteVisit"],
    {
      message: "Invalid interaction type",
    }
  ),

  scheduledAt: z
    .string()
    .datetime()
    .optional(),

  duration: z
    .number()
    .positive()
    .optional(),

  note: z
    .string()
    .max(500)
    .optional(),

  location: z
    .object({
      address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      pincode: z.string().optional(),
    })
    .optional(),

  locationCoordinates: z
    .object({
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .optional(),
});