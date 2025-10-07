import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage = ({
  title,
  description = "This page is ready for the next creative chapter. Continue in chat to shape its content.",
}: PlaceholderPageProps) => {
  return (
    <section className="flex w-full flex-1 flex-col items-center justify-center gap-6 rounded-[2.5rem] border border-foreground/10 bg-white/60 p-12 text-center backdrop-blur-md">
      <h1 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-xl text-base text-foreground/70 sm:text-lg">
        {description}
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2 text-sm font-medium text-foreground/70 transition hover:border-foreground/40 hover:text-foreground"
      >
        Return to home
      </Link>
    </section>
  );
};

export default PlaceholderPage;
