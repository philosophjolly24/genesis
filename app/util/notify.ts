import toast from "react-hot-toast";

const notify = {
  success: (message: string, style?: any) => toast.success(message, { style }), // eslint-disable-line @typescript-eslint/no-explicit-any
  error: (message: string, style?: any) => toast.error(message, { style }), // eslint-disable-line @typescript-eslint/no-explicit-any
  loading: (message: string) => toast.loading(message),
  emoji: (message: string, emoji: string) => toast(message, { icon: emoji }),
};

export { notify };
