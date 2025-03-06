export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing and using The News website, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of Our Services</h2>
          <p className="mb-4">You agree to use our services only for purposes that are:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Legal and permitted by these terms</li>
            <li>Not harmful to others or our services</li>
            <li>Not violating any applicable laws or regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="mb-4">When creating an account, you agree to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Not share your account credentials</li>
            <li>Notify us of any unauthorized use</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Content</h2>
          <p className="mb-4">
            All content published on The News is protected by copyright and other intellectual
            property laws. You may not reproduce, distribute, or create derivative works
            without our express permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. User Comments</h2>
          <p className="mb-4">When posting comments, you agree not to submit content that:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Is illegal, harmful, or offensive</li>
            <li>Infringes on others&apos; rights</li>
            <li>Contains spam or malicious code</li>
            <li>Misrepresents your identity</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
          <p>
            The News is provided &quot;as is&quot; without warranties of any kind. We are not liable
            for any damages arising from your use of our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users
            of any material changes through our website or email.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:legal@thenews.com" className="text-primary hover:underline">
              legal@thenews.com
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}
