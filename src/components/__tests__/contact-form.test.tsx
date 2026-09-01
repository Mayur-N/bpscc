import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/contact-form";

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Full Name"), "Jordan Smith");
  await user.type(screen.getByLabelText("Email"), "jordan@example.com");
  await user.selectOptions(screen.getByLabelText("Inquiry Type"), "General Query");
  await user.type(
    screen.getByLabelText("Message"),
    "I'd like to learn more about training sessions."
  );
}

describe("ContactForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a success message after a valid submission", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) })
    );
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Thanks for reaching out!")).toBeInTheDocument();
  });

  it("shows an error message when the server rejects the submission", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: "Please provide a valid email." }),
      })
    );
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Please provide a valid email.")).toBeInTheDocument();
  });
});
