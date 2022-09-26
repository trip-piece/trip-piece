// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from "msw";
import { diaryHandlers } from "./diaryHandlers";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers, ...diaryHandlers);
