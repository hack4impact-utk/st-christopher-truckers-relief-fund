import { z } from "zod";

import {
  createFeatureFlag,
  updateFeatureFlag,
} from "@/server/api/feature-flags/private-mutations";
import { FeatureFlag } from "@/types";
import {
  getFailedJsonApiResponse,
  getSuccessfulJsonApiResponse,
} from "@/utils/getJsonApiResponse";

const postRequestValidator = z.object({
  name: z.string(),
});

export async function POST(request: Request): Promise<Response> {
  try {
    const json = await request.json();

    const apiKeyHeader = request.headers.get("x-api-key");

    if (!apiKeyHeader || apiKeyHeader !== process.env.API_KEY) {
      return getFailedJsonApiResponse(401, "Invalid request.");
    }

    const parsedJson = postRequestValidator.safeParse(json);

    if (parsedJson.success === false) {
      return getFailedJsonApiResponse(400, "Invalid request body.");
    }

    const name = parsedJson.data.name;

    const featureFlag: FeatureFlag = {
      name,
      enabled: true,
    };

    const [, error] = await createFeatureFlag(featureFlag);

    if (error !== null) {
      return getFailedJsonApiResponse(500, "Internal server error.");
    }

    return getSuccessfulJsonApiResponse(200);
  } catch (error) {
    console.error(error);
    return getFailedJsonApiResponse(500, "Internal server error.");
  }
}

const putRequestValidator = z.object({
  name: z.string(),
  enabled: z.boolean(),
});

export async function PUT(request: Request): Promise<Response> {
  try {
    const json = await request.json();

    const apiKeyHeader = request.headers.get("x-api-key");

    if (!apiKeyHeader || apiKeyHeader !== process.env.API_KEY) {
      return getFailedJsonApiResponse(401, "Invalid request.");
    }

    const parsedJson = putRequestValidator.safeParse(json);

    if (parsedJson.success === false) {
      return getFailedJsonApiResponse(400, "Invalid request body.");
    }

    const featureFlag: FeatureFlag = {
      name: parsedJson.data.name,
      enabled: parsedJson.data.enabled,
    };

    const [, error] = await updateFeatureFlag(featureFlag);

    if (error !== null) {
      return getFailedJsonApiResponse(500, "Internal server error.");
    }

    return getSuccessfulJsonApiResponse(200);
  } catch (error) {
    console.error(error);
    return getFailedJsonApiResponse(500, "Internal server error.");
  }
}
