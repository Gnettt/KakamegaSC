'use client';

export default function Downloads() {
  const downloads = [
    {
      title: 'Membership Form',
      description: 'Complete this form to apply for membership',
      icon: '📝',
      fileName: 'Kakamega_Sports_Club_Membership_Form.pdf'
    },
    {
      title: 'Club Constitution',
      description: 'Official constitution and bylaws of the club',
      icon: '📋',
      fileName: 'Kakamega_Sports_Club_Constitution.pdf'
    },
    {
      title: 'Membership Categories',
      description: 'Detailed information about membership options',
      icon: '👥',
      fileName: 'Membership_Categories.pdf'
    },
    {
      title: 'Facilities Overview',
      description: 'Complete guide to club facilities and amenities',
      icon: '🏟️',
      fileName: 'Facilities_Overview.pdf'
    }
  ];

  const handleDownload = (fileName: string) => {
    const link = document.createElement('a');
    link.href = `/${fileName}`;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#865807' }}>
            Downloads
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Access important documents and forms for membership and club information.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {downloads.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border-l-4"
                style={{ borderColor: '#865807' }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{item.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1" style={{ color: '#865807' }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(item.fileName)}
                  className="w-full px-4 py-2 font-semibold text-white rounded-lg transition hover:opacity-90"
                  style={{ backgroundColor: '#865807' }}
                >
                  Download PDF
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-lg" style={{ backgroundColor: '#f8f6f1' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#865807' }}>
              Need Help?
            </h2>
            <p className="text-gray-700 mb-4">
              If you can't find what you're looking for, please don't hesitate to contact us.
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>📧 reception@kakamegasportsclub.com</p>
              <p>📞 +254 703 267 336 / +254 738 267 336</p>
              <p>🕐 Office Hours: 8:00am – 5:00pm</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
