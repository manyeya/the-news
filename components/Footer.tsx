import Link from 'next/link'
import NewsletterForm from './footer/NewsletterForm'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Site Navigation */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Navigation</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/category/technology" className="hover:underline">Technology</Link></li>
              <li><Link href="/category/business" className="hover:underline">Business</Link></li>
              <li><Link href="/category/sports" className="hover:underline">Sports</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Follow Us</h3>
            <ul className="space-y-4">
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for the latest updates.</p>
            <NewsletterForm />
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t">
          <p className="text-center text-sm">
            © {currentYear} The News. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
