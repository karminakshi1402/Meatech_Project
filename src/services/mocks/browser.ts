import { setupWorker } from "msw/browser";
import { TaskServices } from "../taskServices/taskServices";

export const worker = setupWorker(...TaskServices);