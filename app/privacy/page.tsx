export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            The News (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
          <p className="mb-4">We may collect personal information that you voluntarily provide, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name and email address when subscribing to our newsletter</li>
            <li>Contact information when filling out our contact form</li>
            <li>Account information if you create an account</li>
            <li>Comments and feedback you provide</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Automatically Collected Information</h3>
          <p className="mb-4">When you visit our website, we automatically collect:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Device information (browser type, operating system)</li>
            <li>IP address and location data</li>
            <li>Usage data (pages visited, time spent)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">We use the collected information for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Providing and maintaining our services</li>
            <li>Sending newsletters and updates</li>
            <li>Responding to your inquiries</li>
            <li>Improving our website and user experience</li>
            <li>Analytics and performance monitoring</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your
            personal information. However, please note that no method of transmission over the
            internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Withdraw consent for data processing</li>
            <li>Object to data processing</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@thenews.com" className="text-primary hover:underline">
              privacy@thenews.com
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}
