export function getFailedJsonApiResponse(
  statusCode: number,
  error: string,
): Response {
  const returnObject = {
    success: false,
    error,
  };

  return new Response(JSON.stringify(returnObject), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

export function getSuccessfulJsonApiResponse(
  statusCode: number,
  data?: unknown,
): Response {
  return new Response(JSON.stringify({ success: true, data }), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}
