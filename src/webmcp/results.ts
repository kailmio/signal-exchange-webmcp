import type { CommandResult } from "../domain/types";

export function toToolResult<T>(result: CommandResult<T>) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result),
      },
    ],
  };
}
