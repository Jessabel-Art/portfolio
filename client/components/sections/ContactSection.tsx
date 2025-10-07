import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, Send, Twitter } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SectionContainer } from "@/components/sections/SectionContainer";
import { cn } from "@/lib/utils";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkgzlkve";

// --- Validation (slightly stricter + length guards) ---
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Tell me the name you would like me to greet.")
    .max(80, "Let’s keep your name under 80 characters."),
  email: z
    .string()
    .email("That address doesn’t look quite right. Could you double-check it?")
    .max(120, "Email addresses longer than 120 characters are uncommon."),
  message: z
    .string()
    .min(10, "Share a bit more context so I can prepare the best response.")
    .max(2000, "Let’s cap the message at ~2000 characters for now."),
  // Honeypot (should remain empty)
  _gotcha: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jessabelsantos", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com/jessabelcreates", icon: Twitter },
  { label: "GitHub", href: "https://github.com/jessabel", icon: Github },
  { label: "Email", href: "mailto:hello@jessabel.studio", icon: Mail },
];

export const ContactSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", _gotcha: "" },
    mode: "onBlur",
  });

  const onSubmit = useCallback(
    async (values: ContactFormValues) => {
      setStatus("idle");

      // Spam trap: if honeypot has content, silently "succeed"
      if (values._gotcha) {
        setStatus("success");
        reset({ name: "", email: "", message: "", _gotcha: "" });
        return;
      }

      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            message: values.message,
            _subject: "New portfolio inquiry from jessabel.art",
            _replyto: values.email,
          }),
        });

        if (!res.ok) throw new Error(`Formspree responded ${res.status}`);

        const data = await res.json().catch(() => ({}));
        // Formspree returns { ok: true } on success (JSON)
        if ((data as any).ok === true || res.status === 200) {
          setStatus("success");
          reset({ name: "", email: "", message: "", _gotcha: "" });
        } else {
          throw new Error("Unexpected response");
        }
      } catch {
        setStatus("error");
      }
    },
    [reset]
  );

  return (
    <SectionContainer id="contact" watermark="CONNECT">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-foreground/60">
          Let’s collaborate
        </p>
        <h2 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
          Share your vision—I'll craft the spaces, stories, and systems to bring it to life.
        </h2>
        <p className="text-base text-foreground/70 sm:text-lg">
          I respond within two business days. Tell me about the challenge, the audience you serve, and the impact you’re pursuing.
        </p>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)] lg:items-start">
        {/* --- FORM --- */}
        <motion.form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-[2.75rem] border border-white/60 bg-white/75 p-8 shadow-[0_24px_80px_rgba(18,28,42,0.12)] backdrop-blur-xl"
          variants={fadeIn}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          aria-describedby="contact-status"
          aria-busy={isSubmitting}
        >
          <div className="flex flex-col gap-6">
            {/* Success / Error banners */}
            {status === "success" && (
              <motion.div
                id="contact-status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-[1.25rem] border border-emerald-200/60 bg-emerald-50/80 px-5 py-4 text-sm text-emerald-900"
                role="status"
                aria-live="polite"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">✓</span>
                Message received — I’ll reply shortly with next steps.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                id="contact-status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-[1.25rem] border border-red-200/60 bg-red-50/80 px-5 py-4 text-sm text-red-900"
                role="alert"
                aria-live="assertive"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white">!</span>
                Something went wrong sending your message. You can email me directly at{" "}
                <a className="underline" href="mailto:hello@jessabel.studio">hello@jessabel.studio</a>.
              </motion.div>
            )}

            {/* Honeypot (hidden from humans) */}
            <div className="hidden">
              <label htmlFor="contact-gotcha">Leave this field empty</label>
              <input id="contact-gotcha" type="text" tabIndex={-1} autoComplete="off" {...register("_gotcha")} />
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm font-medium text-foreground" htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                {...register("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={cn(
                  "w-full rounded-[2rem] border border-foreground/15 bg-white/90 px-4 py-3 text-base text-foreground shadow-[0_10px_30px_rgba(18,28,42,0.08)] outline-none transition focus:border-foreground/40",
                  errors.name && "border-destructive/60"
                )}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-destructive" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm font-medium text-foreground" htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                {...register("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={cn(
                  "w-full rounded-[2rem] border border-foreground/15 bg-white/90 px-4 py-3 text-base text-foreground shadow-[0_10px_30px_rgba(18,28,42,0.08)] outline-none transition focus:border-foreground/40",
                  errors.email && "border-destructive/60"
                )}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm font-medium text-foreground" htmlFor="contact-message">Project Details</label>
              <textarea
                id="contact-message"
                rows={6}
                autoComplete="off"
                {...register("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={cn(
                  "w-full resize-none rounded-[2rem] border border-foreground/15 bg-white/90 px-4 py-3 text-base text-foreground shadow-[0_10px_30px_rgba(18,28,42,0.08)] outline-none transition focus:border-foreground/40",
                  errors.message && "border-destructive/60"
                )}
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-destructive" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={prefersReducedMotion ? undefined : { translateY: -4 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-foreground px-7 py-3 text-sm font-medium uppercase tracking-[0.2em] text-background transition hover:bg-foreground/90 disabled:pointer-events-none disabled:opacity-70"
            >
              {isSubmitting ? "Sending" : "Send Message"}
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.form>

        {/* --- Socials column --- */}
        <motion.div
          className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
          variants={fadeIn}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="text-sm leading-relaxed text-foreground/70">
            Prefer starting with a quick hello? These links open the channels where I publish process notes, prototypes, and in-progress experiments.
          </p>
          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm font-medium text-foreground/75 transition hover:border-foreground/40 hover:text-foreground"
                whileHover={prefersReducedMotion ? undefined : { translateY: -3 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              >
                <social.icon className="h-4 w-4" />
                <span>{social.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};
