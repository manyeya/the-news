export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          Welcome to The News, your trusted source for the latest news and updates from around the world.
        </p>
        <p className="mb-6">
          Our mission is to deliver accurate, timely, and comprehensive news coverage across various topics
          including technology, business, sports, and more. We believe in journalism that informs,
          educates, and empowers our readers to make informed decisions.
        </p>
        <p className="mb-6">
          Founded with a vision to provide quality news coverage, The News has grown to become
          a reliable platform for readers seeking objective reporting and in-depth analysis of
          current events.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Accuracy and truthfulness in reporting</li>
          <li>Unbiased coverage of events</li>
          <li>Respect for reader privacy</li>
          <li>Commitment to journalistic integrity</li>
        </ul>
      </div>
    </main>
  )
}
