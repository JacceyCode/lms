import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <section className="loading">
      <Loader2 className="loading__spinner" />
      <span className="loading__text">Loading...</span>
    </section>
  );
};

export default Loading;
