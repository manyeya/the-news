import ContactForm from "@/components/contact/ContactForm"

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="max-w-2xl">
        <p className="text-lg mb-8">
          Have a question or feedback? We&apos;d love to hear from you. Fill out the form below
          and we&apos;ll get back to you as soon as possible.
        </p>

        <ContactForm />

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Other Ways to Reach Us</h2>
          <div className="space-y-4">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:contact@thenews.com" className="hover:underline">
                contact@thenews.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong> +27 (63) 788-0666
            </p>
            <p>
              <strong>Address:</strong><br />
              72 Mamba Street<br />
              Pretoria, Centurion<br />
              South Africa
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
