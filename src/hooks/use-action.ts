import { toast } from "sonner";

/**
 * Lightweight helper to wire mock buttons in the demo to user feedback.
 * Returns a click handler that shows a toast.
 */
export function useAction() {
  return (label: string, description?: string) => () => {
    toast.success(label, description ? { description } : undefined);
  };
}

export function notify(label: string, description?: string) {
  toast.success(label, description ? { description } : undefined);
}

export function notifyInfo(label: string, description?: string) {
  toast(label, description ? { description } : undefined);
}
