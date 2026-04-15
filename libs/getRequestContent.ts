type RequestBody = {
  body?: unknown;
  content?: unknown;
};

const getRequestContent = (payload: unknown) => {
  if (!payload || typeof payload !== "object") {
    return undefined;
  }

  const { body, content } = payload as RequestBody;
  const value = content ?? body;

  return typeof value === "string" ? value : undefined;
};

export default getRequestContent;
