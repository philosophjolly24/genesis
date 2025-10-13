import type { ListSchema } from "../database/api/api";
import type { JSONSchemaType } from "ajv";

const schema: JSONSchemaType<ListSchema> = {
  type: "object",
  properties: {
    list: {
      type: "object",
      properties: {
        name: { type: "string" },
        id: { type: "string" },
        emoji: { type: "string" },
        created_at: { type: "number" },
        updated_at: { type: "number" },
      },
      required: ["id", "name", "emoji", "created_at", "updated_at"],
      additionalProperties: false,
    },

    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          list_id: { type: "string" },
          name: { type: "string" },
          notes: { type: "string", nullable: true },
          price: { type: "number", nullable: true },
          quantity: { type: "number", nullable: true },
          unit: { type: "string", nullable: true },
          checked: { type: "boolean" },
          category: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
            },
            nullable: true,
            required: ["id", "name"],
            additionalProperties: false,
          },
        },
        required: ["id", "list_id", "name", "checked"],
        additionalProperties: false,
      },
    },
  },
  required: ["list", "items"],
  additionalProperties: false,
};

export { schema };
